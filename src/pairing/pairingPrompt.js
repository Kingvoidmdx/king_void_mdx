const readline = require('readline');
const { logger } = require('../utils/logger');

class PairingPrompt {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async startPairing() {
    return new Promise((resolve) => {
      console.log('\n');
      console.log('╔════════════════════════════════════╗');
      console.log('║      VOID X 🤖 Pairing System      ║');
      console.log('╚════════════════════════════════════╝');
      console.log('\n📱 Choose pairing method:\n');
      console.log('  1️⃣  QR Code (Scan with WhatsApp)');
      console.log('  2️⃣  Phone Number (Enter number for pairing code)');
      console.log('');

      this.rl.question('Enter your choice (1 or 2): ', (choice) => {
        if (choice === '1') {
          resolve({ method: 'qr' });
        } else if (choice === '2') {
          this.rl.question('📱 Enter WhatsApp number (e.g., 234812345678): ', (number) => {
            const clean = number.replace(/[^0-9]/g, '');
            if (clean.length < 10) {
              logger.error('❌ Invalid number. Use format: 234812345678');
              resolve(null);
              return;
            }
            resolve({ method: 'phone', number: clean });
          });
        } else {
          logger.info('❌ Invalid choice. Using QR Code...');
          resolve({ method: 'qr' });
        }
      });
    });
  }

  async verifySession(sessionId) {
    return new Promise((resolve) => {
      console.log('\n');
      console.log('╔══════════════════════════════════════════╗');
      console.log('║        SESSION ID VERIFICATION           ║');
      console.log('╚══════════════════════════════════════════╝');
      console.log('\n📱 A 24-word session ID has been sent to your WhatsApp DM.');
      console.log('📝 You must enter it here to activate the bot.\n');

      const firstWord = sessionId.split(' ')[0];
      console.log(`💡 Hint: The first word is: "${firstWord}"`);
      console.log('');

      const prompt = () => {
        this.rl.question('🔑 Paste your 24-word session ID here:\n> ', (input) => {
          const cleaned = input.trim().toLowerCase().replace(/\s+/g, ' ');
          const expected = sessionId.trim().toLowerCase().replace(/\s+/g, ' ');

          if (cleaned === expected) {
            console.log('');
            logger.success('✅ Session verified! Bot is now active.');
            console.log('');
            resolve(true);
          } else {
            const inWords = cleaned.split(' ').length;
            logger.error(`❌ Invalid session ID (you entered ${inWords} words, expected 24).`);
            console.log('');

            this.rl.question('Try again? (y/n): ', (retry) => {
              if (retry.toLowerCase() === 'y' || retry.toLowerCase() === 'yes') {
                prompt();
              } else {
                resolve(false);
              }
            });
          }
        });
      };

      prompt();
    });
  }

  close() {
    try {
      this.rl.close();
    } catch (e) {}
  }
}

module.exports = { PairingPrompt };
