module.exports = {
  name: 'bot_info',
  description: 'Show bot information',
  category: 'utility',
  execute: async (message, botInstance) => {
    const pkg = require('../../package.json');
    const info = `🤖 Bot Name: ${pkg.name}\n📦 Version: ${pkg.version}\n👨‍💻 Author: ${pkg.author}`;
    return { success: true, message: info };
  }
};
