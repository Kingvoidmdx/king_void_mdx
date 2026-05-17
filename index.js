require('dotenv').config();
const { WhatsAppConnection } = require('./src/whatsapp/connection');
const { MessageHandler } = require('./src/whatsapp/messageHandler');
const { loadCommands } = require('./src/commands/loader');
const { PairingPrompt } = require('./src/pairing/pairingPrompt');
const { logger } = require('./src/utils/logger');

let waConnection = null;
let messageHandler = null;

const startBot = async () => {
  try {
    logger.info('🚀 Starting VOID X 🤖 Bot...');

    const commands = await loadCommands();
    logger.info(`✅ Loaded ${commands.length} commands`);

    waConnection = new WhatsAppConnection();

    const pairingPrompt = new PairingPrompt();
    const pairingChoice = await pairingPrompt.startPairing();

    if (!pairingChoice) {
      logger.error('❌ Pairing cancelled');
      process.exit(1);
    }

    logger.info(`✅ Using ${pairingChoice.method.toUpperCase()} pairing method`);

    const pairingNumber = pairingChoice.method === 'phone' ? pairingChoice.number : null;

    if (pairingChoice.method === 'phone') {
      logger.info(`📱 Will pair number: ${pairingNumber}`);
    }

    const socket = await waConnection.connect(pairingNumber);

    await new Promise(resolve => {
      const check = () => {
        if (waConnection.isConnected) resolve();
        else setTimeout(check, 1000);
      };
      check();
    });

    if (pairingChoice.method === 'phone') {
      logger.info('🔐 Generating session ID and sending to your WhatsApp...');
      const sessionId = await waConnection.doSessionVerification();

      if (!sessionId) {
        logger.error('❌ Failed to generate session ID');
        process.exit(1);
      }

      const verified = await pairingPrompt.verifySession(sessionId);
      if (!verified) {
        logger.error('❌ Session verification failed. Bot shutting down.');
        process.exit(1);
      }
    }

    pairingPrompt.close();

    messageHandler = new MessageHandler(socket, commands);
    logger.info('✅ Message handler initialized');

    logger.success('✅ VOID X 🤖 is now running!');
    logger.info('💬 Waiting for messages...');

  } catch (error) {
    logger.error('❌ Failed to start bot:', error.message);
    process.exit(1);
  }
};

process.on('SIGINT', () => {
  logger.info('👋 Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('👋 Shutting down gracefully...');
  process.exit(0);
});

startBot();
