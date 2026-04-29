const fs = require('fs').promises;
const path = require('path');
const { logger } = require('../utils/logger');

/**
 * Load all commands from commands directory
 * @returns {Promise<array>} Loaded commands
 */
const loadCommands = async () => {
  try {
    const commandsDir = path.join(__dirname);
    const files = await fs.readdir(commandsDir);
    const commands = [];

    for (const file of files) {
      if (file === 'loader.js' || !file.endsWith('.js')) continue;

      try {
        const command = require(path.join(commandsDir, file));
        if (command.execute && command.name) {
          commands.push(command);
          logger.info(`✅ Loaded command: ${command.name}`);
        }
      } catch (error) {
        logger.warn(`⚠️  Failed to load command ${file}:`, error.message);
      }
    }

    return commands;
  } catch (error) {
    logger.error('❌ Failed to load commands:', error);
    return [];
  }
};

module.exports = { loadCommands };