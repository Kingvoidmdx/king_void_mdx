require('dotenv').config();
const { WhatsAppConnection } = require('./src/whatsapp/connection');
const { MessageHandler } = require('./src/whatsapp/messageHandler');
const { loadCommands } = require('./src/commands/loader');
const { PairingPrompt } = require('./src/pairing/pairingPrompt');
const { PairingSystem } = require('./src/pairing/index');
const { logger } = require('./src/utils/logger');
const { saveSession } = require('./src/database/sessions');

let waConnection = null;
let messageHandler = null;

const startBot = async () => {
  try {
    logger.info('🚀 Starting KING_VOID<>MDX Bot...');

    // Initialize pairing system
    const pairingSystem = new PairingSystem();
    logger.info('✅ Pairing system initialized');

    // Load commands
    const commands = await loadCommands();
    logger.info(`✅ Loaded ${commands.length} commands`);

    // Connect to WhatsApp first so we can send push codes
    waConnection = new WhatsAppConnection();
    const socket = await waConnection.connect();

    // Wait for connection to be established
    await new Promise(resolve => {
      const checkConnection = () => {
        if (waConnection.isConnected) {
          resolve();
        } else {
          setTimeout(checkConnection, 1000);
        }
      };
      checkConnection();
    });

    // Now show pairing menu and pass the connected waConnection
    const pairingPrompt = new PairingPrompt(pairingSystem);
    const pairingChoice = await pairingPrompt.startPairing(waConnection);
    pairingPrompt.close();

    if (!pairingChoice) {
      logger.error('❌ Pairing cancelled or failed');
      process.exit(1);
    }

    logger.info(`✅ Using ${pairingChoice.method.toUpperCase()} pairing method`);

    // Initialize message handler
    messageHandler = new MessageHandler(socket, commands);
    logger.info('✅ Message handler initialized');

    // Save session info
    if (pairingChoice.session) {
      await saveSession(pairingChoice.sessionId, pairingChoice.session);
    }

    logger.success('✅ Bot is now running!');
    logger.info('💬 Waiting for messages...');

  } catch (error) {
    logger.error('❌ Failed to start bot:', error.message);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGINT', () => {
  logger.info('👋 Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('👋 Shutting down gracefully...');
  process.exit(0);
});

// Start the bot
startBot();
