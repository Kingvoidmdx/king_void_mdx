module.exports = {
  name: 'help',
  description: 'Show all available commands',
  category: 'utility',
  execute: async (message, botInstance) => {
    try {
      const { commands } = botInstance;
      const prefix = message.args[0] || '.';

      let helpText = `
╔═══════════════════════════════╗
║   KING_VOID<>MDX Commands      ║
╚═══════════════════════════════╝

`;

      // Group commands by category
      const categories = {};
      commands.forEach(cmd => {
        const cat = cmd.category || 'other';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(cmd);
      });

      // Build help text
      for (const [category, cmds] of Object.entries(categories)) {
        helpText += `📂 ${category.toUpperCase()}\n`;
        cmds.forEach(cmd => {
          helpText += `  ${prefix}${cmd.name} - ${cmd.description || 'No description'}\n`;
        });
        helpText += '\n';
      }

      helpText += `💡 TIP: Use ${prefix}setprefix [symbol] to change prefix\n`;
      helpText += `📦 Repository: github.com/Kingvoidmdx/king_void_mdx`;

      return {
        success: true,
        message: helpText.trim()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};
