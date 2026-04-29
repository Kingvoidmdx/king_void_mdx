const { setCommandPrefix } = require('../database/prefixManager');

module.exports = {
  name: 'setprefix',
  description: 'Change command prefix (single character)',
  category: 'utility',
  execute: async (message, botInstance) => {
    try {
      const { args, from } = message;
      const { socket } = botInstance;

      if (!args || args.length === 0) {
        return {
          success: false,
          error: 'Usage: .setprefix [symbol]\nExample: .setprefix !'
        };
      }

      const newPrefix = args[0];

      if (newPrefix.length !== 1) {
        return {
          success: false,
          error: 'Prefix must be a single character'
        };
      }

      // Save new prefix
      const result = await setCommandPrefix(from, newPrefix);

      return {
        success: result.success,
        message: result.message || result.error
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};
