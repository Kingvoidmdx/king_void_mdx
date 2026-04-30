const readline = require('readline');
const QRCode = require('qrcode');
const { logger } = require('../utils/logger');
const { generateSessionId } = require('./sessionManager');

class PairingPrompt {
  constructor(pairingSystem) {
    this.pairingSystem = pairingSystem;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  /**
   * Show pairing options to user
   */
  async showPairingMenu() {
    return new Promise((resolve) => {
      console.log('\n');
      console.log('╔════════════════════════════════════╗');
      console.log('║   KING_VOID<>MDX Pairing System    ║');
      console.log('╚════════════════════════════════════╝');
      console.log('\n📱 Choose pairing method:\n');
      console.log('  1️⃣  QR Code (Fast & Easy)');
      console.log('  2️⃣  Phone Pairing (8-digit code via WhatsApp)');
      console.log('\n');

      this.rl.question('Enter your choice (1 or 2): ', (choice) => {
        if (choice === '1') {
          resolve('qr');
        } else if (choice === '2') {
          resolve('phone');
        } else {
          console.log('❌ Invalid choice. Using QR Code...');
          resolve('qr');
        }
      });
    });
  }

  /**
   * QR Code pairing flow
   */
  async pairingWithQR() {
    return new Promise((resolve) => {
      logger.info('📲 Scan the QR Code below with WhatsApp:');
      logger.info('💡 Keep your phone close to the screen\n');

      // In real implementation, bot will generate QR
      // For now, just wait for connection
      const sessionId = generateSessionId();
      
      setTimeout(() => {
        resolve({
          method: 'qr',
          sessionId: sessionId,
          status: 'waiting'
        });
      }, 2000);
    });
  }

  /**
   * Phone number pairing flow
   * If a WhatsApp connection is provided and connected, the push code will be sent via WhatsApp.
   * @param {object} waConnection - Optional WhatsAppConnection instance
   */
  async pairingWithPhone(waConnection = null) {
    return new Promise((resolve) => {
      this.rl.question(
        '\n📱 Enter your WhatsApp number (without +, e.g., 2348036377933): ',
        async (number) => {
          if (!number || number.length < 10) {
            logger.error('❌ Invalid number. Please try again.');
            resolve(null);
            return;
          }

          try {
            logger.info(`🔄 Generating push code for ${number}...`);
            
            const result = this.pairingSystem.generatePushCode(number);

            // If WhatsApp connection is available and connected, send the code via WhatsApp
            if (waConnection && waConnection.isConnected) {
              try {
                const jid = `${number}@s.whatsapp.net`;
                const textMsg = `KING_VOID<>MDX pairing code:\n\nCode: ${result.code}\n\nUse this code in the terminal to complete pairing.\n\nRepository: https://github.com/Kingvoidmdx/king_void_mdx`;
                await waConnection.sendMessage(jid, { text: textMsg });
                logger.success(`📨 Push code sent to ${number} via WhatsApp`);
              } catch (err) {
                logger.warn('⚠️  Failed to send push code via WhatsApp:', err.message);
                logger.info('🔁 The code is still valid; please check your terminal logs.');
              }
            } else {
              logger.warn('⚠️  WhatsApp connection not available. The code will be shown in the terminal.');
              logger.info(`
📧 Push code for ${number}: ${result.code}
`);
            }

            logger.success(`\n✅ Push code generated!`);
            logger.info(`📧 You should receive an 8-digit code soon\n`);

            this.rl.question(
              'Enter the 8-digit code you received: ',
              (code) => {
                if (code.length === 8 && /^\d+$/.test(code)) {
                  const isValid = this.pairingSystem.verifyPushCode(result.sessionId, code);
                  
                  if (isValid) {
                    logger.success('✅ Code verified! Creating session...');
                    const session = this.pairingSystem.createSession(
                      result.sessionId,
                      number,
                      'phone'
                    );
                    
                    resolve({
                      method: 'phone',
                      sessionId: result.sessionId,
                      userNumber: number,
                      status: 'verified',
                      session: session
                    });
                  } else {
                    logger.error('❌ Invalid code. Please try again.');
                    resolve(null);
                  }
                } else {
                  logger.error('❌ Code must be 8 digits');
                  resolve(null);
                }
              }
            );
          } catch (error) {
            logger.error('❌ Pairing error:', error.message);
            resolve(null);
          }
        }
      );
    });
  }

  /**
   * Close readline interface
   */
  close() {
    try {
      this.rl.close();
    } catch (e) {
      // ignore
    }
  }
}

module.exports = { PairingPrompt };
