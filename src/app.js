const express = require('express');
const { initPairingSystem } = require('./pairing');
const { loadCommands } = require('./commands/loader');
const { logger } = require('./utils/logger');

const app = express();
let botInstance = null;

app.use(express.json());

const startApp = async () => {
  try {
    logger.info('🚀 Starting KING_VOID<>MDX Bot...');
    
    // Initialize pairing system
    const pairingSystem = await initPairingSystem();
    
    // Load commands
    const commands = await loadCommands();
    logger.info(`✅ Loaded ${commands.length} commands`);
    
    // Start Express server for webhook/API
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      logger.info(`✅ Server running on port ${PORT}`);
    });
    
    botInstance = {
      pairing: pairingSystem,
      commands: commands,
      status: 'RUNNING'
    };
    
    logger.info('✅ Bot initialized successfully!');
    return botInstance;
  } catch (error) {
    logger.error('❌ Failed to start bot:', error);
    process.exit(1);
  }
};

module.exports = { startApp, app };