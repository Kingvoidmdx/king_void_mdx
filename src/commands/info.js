const settings = require('../../config/settings');

module.exports = {
  name: 'info',
  description: 'Show bot information',
  category: 'utility',
  execute: async (message, botInstance) => {
    try {
      const infoText = `
╔═══════════════════════════════╗
║   Bot Information              ║
╚═══════════════════════════════╝

🤖 Bot Name: ${settings.bot.name}
📦 Version: ${settings.bot.version}
👨‍💻 Author: ${settings.bot.author}
📝 Description: ${settings.bot.description}

🔧 Features:
  ✅ Dual Pairing (QR + Push Code)
  ✅ Session Management
  ✅ Custom Commands
  ✅ Custom Prefix
  ✅ Multi-platform Support

🌍 Platforms:
  📱 Termux
  🖥️  Windows/macOS/Linux
  🐧 Linux VPS
  🦖 Pterodactyl Panels

🔗 Repository:
  https://github.com/Kingvoidmdx/king_void_mdx

💝 Made with ❤️ by King Val
`;

      return {
        success: true,
        message: infoText.trim()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};
