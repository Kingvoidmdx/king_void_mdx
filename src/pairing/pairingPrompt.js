const readline = require('readline');
const QRCode = require('qrcode');
const { generatePushCode, verifyPushCode, createSession } = require('./index');
const { generateSessionId } = require('./sessionManager');
const { logger } = require('../utils/logger');

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
   */
  async pairingWithPhone() {
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
            
            logger.success(`\n✅ Push code sent to your WhatsApp!`);
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
   * Start pairing process
   */
  async startPairing() {
    try {
      const method = await this.showPairingMenu();

      if (method === 'qr') {
        return await this.pairingWithQR();
      } else if (method === 'phone') {
        return await this.pairingWithPhone();
      }
    } catch (error) {
      logger.error('❌ Pairing process error:', error.message);
      return null;
    }
  }

  /**
   * Close readline interface
   */
  close() {
    this.rl.close();
  }
}

module.exports = { PairingPrompt };
