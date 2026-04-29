const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, isJidBroadcast } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');\nconst pino = require('pino');
const { logger } = require('../utils/logger');
const { saveSession, loadSession } = require('../database/sessions');

class WhatsAppConnection {
  constructor() {
    this.socket = null;
    this.qrCode = null;
    this.isConnected = false;
    this.userJid = null;
  }

  /**
   * Initialize WhatsApp connection
   */
  async connect() {
    try {
      logger.info('📱 Initializing WhatsApp connection...');

      const { state, saveCreds } = await useMultiFileAuthState('./auth_info_baileys');

      const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        logger: pino({ level: 'silent' }),
        browser: ['KING_VOID<>MDX', 'Safari', '1.0.0'],
        syncFullHistory: false,
        shouldIgnoreJid: (jid) => isJidBroadcast(jid),
      });

      // Handle credentials update
      sock.ev.on('creds.update', saveCreds);

      // Handle connection updates
      sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
          this.qrCode = qr;
          logger.info('📲 QR Code generated! Scan with WhatsApp');
        }

        if (connection === 'connecting') {
          logger.info('🔄 Connecting to WhatsApp...');
        }

        if (connection === 'open') {
          this.isConnected = true;
          this.userJid = sock.user.id;
          logger.success('✅ Connected to WhatsApp!');
          logger.info(`📞 User JID: ${this.userJid}`);
          
          // Send welcome message to self
          await this.sendWelcomeMessage();
        }

        if (connection === 'close') {
          const shouldReconnect =
            lastDisconnect?.error instanceof Boom &&
            lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut;

          if (shouldReconnect) {
            logger.warn('⚠️  Connection closed. Reconnecting...');
            setTimeout(() => this.connect(), 1000);
          } else {
            logger.error('❌ WhatsApp logged out');
            process.exit(0);
          }
        }
      });

      // Handle incoming messages
      sock.ev.on('messages.upsert', async (m) => {
        const message = m.messages[0];
        if (!message.message || message.key.fromMe) return;

        // Emit for message handler
        sock.ev.emit('message.new', message);
      });

      this.socket = sock;
      return sock;
    } catch (error) {
      logger.error('❌ Failed to connect to WhatsApp:', error.message);
      throw error;
    }
  }

  /**
   * Send welcome message to user
   */
  async sendWelcomeMessage() {
    try {
      const jid = this.userJid;
      const message = `
╔════════════════════════════════╗
║  KING_VOID<>MDX Connected! 🎉  ║
╚════════════════════════════════╝

✅ Bot Status: ACTIVE
📦 Repository: github.com/Kingvoidmdx/king_void_mdx
🔑 Session ID: ${this.userJid}

📋 Commands:
.help - List all commands
.info - Bot information
.setprefix [symbol] - Change command prefix
.ping - Check bot status

Made with ❤️ by King Val
      `.trim();

      await this.socket.sendMessage(jid, { text: message });
      logger.success('📨 Welcome message sent to your DM');
    } catch (error) {
      logger.error('❌ Failed to send welcome message:', error.message);
    }
  }

  /**
   * Send message
   */
  async sendMessage(jid, message) {
    try {
      if (typeof message === 'string') {
        await this.socket.sendMessage(jid, { text: message });
      } else {
        await this.socket.sendMessage(jid, message);
      }
    } catch (error) {
      logger.error('❌ Failed to send message:', error.message);
    }
  }

  /**
   * Get connection status
   */
  getStatus() {
    return {
      connected: this.isConnected,
      userJid: this.userJid,
      qrCode: this.qrCode
    };
  }
}

module.exports = { WhatsAppConnection };
