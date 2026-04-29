module.exports = {
  name: 'ping',
  description: 'Check bot status',
  category: 'utility',
  execute: async (message, botInstance) => {
    try {
      const response = `🏓 **PONG!** Bot is running fine!\n`
        + `📊 Status: ACTIVE\n`
        + `⏱️  Response time: ${Date.now()}ms`;
      
      return {
        success: true,
        message: response
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};