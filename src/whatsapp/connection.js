const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, isJidBroadcast, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const qrcode = require('qrcode');
const bip39 = require('bip39');
const { logger } = require('../utils/logger');

class WhatsAppConnection {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.userJid = null;
    this.pairingCode = null;
    this.sessionId = null;
    this.pairingPhone = null;
    this.pairingDone = false;
    this.reconnectTimer = null;
  }

  async connect(phoneNumber = null) {
    try {
      this.pairingPhone = phoneNumber;

      const { state, saveCreds } = await useMultiFileAuthState('./auth_info_baileys');
      const { version } = await fetchLatestBaileysVersion();
      logger.info(`📱 Baileys version: ${version.join('.')}`);

      const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: !this.pairingPhone,
        logger: pino({ level: 'warn' }),
        browser: ['VOID X', 'Chrome', '2.0.0'],
        syncFullHistory: false,
        markOnlineOnConnect: false,
        shouldIgnoreJid: (jid) => isJidBroadcast(jid),
        defaultQueryTimeoutMs: 60000,
      });

      sock.ev.on('creds.update', saveCreds);

      sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr && !this.pairingPhone) {
          this.showQR(qr);
        }

        if (connection === 'open') {
          this.isConnected = true;
          this.userJid = sock.user.id;
          logger.success('✅ Connected to WhatsApp!');
        }

        if (connection === 'close') {
          this.isConnected = false;
          const statusCode = lastDisconnect?.error?.output?.statusCode;
          const isLogout = lastDisconnect?.error instanceof Boom && statusCode === DisconnectReason.loggedOut;

          clearTimeout(this.reconnectTimer);

          if (isLogout && this.pairingCode) {
            logger.warn('🔄 Reconnecting after pairing code...');
            this.reconnectTimer = setTimeout(() => this.connect(this.pairingPhone), 3000);
            return;
          }

          if (isLogout) {
            logger.error('❌ Logged out. Delete auth folder and restart.');
            process.exit(0);
            return;
          }

          logger.warn('🔄 Reconnecting...');
          this.reconnectTimer = setTimeout(() => this.connect(this.pairingPhone), 3000);
        }
      });

      this.socket = sock;

      // For phone pairing: wait for WebSocket to be ready, then request code
      if (this.pairingPhone && !this.pairingDone) {
        await this._waitForSocket(sock);
        await this.doPhonePairing(sock, this.pairingPhone);
      }

      return sock;
    } catch (error) {
      logger.error('❌ Connection error:', error.message);
      throw error;
    }
  }

  async _waitForSocket(sock, timeout = 20000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      if (sock.ws && sock.ws.readyState === 1) return;
      await new Promise(r => setTimeout(r, 500));
    }
    throw new Error('WebSocket connection timed out');
  }

  async doPhonePairing(sock, phone) {
    const num = phone.replace(/[^0-9]/g, '');
    logger.info('⏳ Requesting pairing code...');

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const code = await sock.requestPairingCode(num);
        if (code) {
          this.pairingCode = code;
          this.pairingDone = true;
          logger.success('');
          logger.success('╔══════════════════════════════════════╗');
          logger.success('║       PAIRING CODE                  ║');
          logger.success('╠══════════════════════════════════════╣');
          logger.success(`║  ${code.padEnd(36)}║`);
          logger.success('╠══════════════════════════════════════╣');
          logger.success('║  Open WhatsApp > Linked Devices     ║');
          logger.success('║  Tap "Link a Device"                ║');
          logger.success('║  Enter this code                    ║');
          logger.success('╚══════════════════════════════════════╝');
          logger.success('');
          logger.info('⏳ Waiting for phone...');
          return code;
        }
      } catch (e) {
        const m = e.message || String(e);
        if (m.includes('not open') || m.includes('Connection Closed') || m.includes('ECONNRESET') || m.includes('timeout')) {
          logger.warn(`⚠️ Reconnecting (${attempt + 1}/3)...`);
          await new Promise(r => setTimeout(r, 4000));
          continue;
        }
        if (m.includes('rate') || m.includes('429')) {
          logger.warn('⚠️ Rate limited, waiting 30s...');
          await new Promise(r => setTimeout(r, 30000));
          continue;
        }
        logger.warn(`⚠️ ${m.substring(0, 80)}`);
        await new Promise(r => setTimeout(r, 3000));
      }
    }

    logger.error('❌ Failed to get pairing code after 3 attempts');
    return null;
  }

  async doSessionVerification() {
    try {
      this.sessionId = bip39.generateMnemonic(256);
      const jid = process.env.ADMIN_NUMBER + '@s.whatsapp.net';
      const msg = [
        '*🔐 VOID X SESSION ID*',
        '',
        '```' + this.sessionId + '```',
        '',
        '📝 Enter these 24 words in the terminal to activate the bot.'
      ].join('\n');
      await this.socket.sendMessage(jid, { text: msg });
      logger.success('✅ Session ID sent to your WhatsApp');
      return this.sessionId;
    } catch (error) {
      logger.error('❌ Failed sending session ID:', error.message);
      return null;
    }
  }

  showQR(qrData) {
    qrcode.toString(qrData, { type: 'terminal', small: true }).then(str => {
      console.log('\n╔══════════════════════════════════╗');
      console.log('║      SCAN THIS QR CODE            ║');
      console.log('╚══════════════════════════════════════╝\n');
      console.log(str);
      console.log('📲 Open WhatsApp > Linked Devices > Scan QR\n');
    }).catch(() => {});
  }

  async sendWelcomeMessage() {
    try {
      const jid = process.env.ADMIN_NUMBER + '@s.whatsapp.net';
      const msg = '╔══════════════════╗\n║ VOID X 🤖 Ready ║\n╚══════════════════╝';
      await this.socket.sendMessage(jid, { text: msg });
      logger.success('📨 Welcome message sent');
    } catch (e) {
      logger.error('❌ Welcome message failed:', e.message);
    }
  }
}

module.exports = { WhatsAppConnection };
