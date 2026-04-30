module.exports = {
  name: 'bugmenu',
  description: 'Report or view bugs',
  category: 'utility',
  execute: async (message, botInstance) => {
    return { success: true, message: '🛠️ Bug menu is a placeholder — send .bug [description] to report a bug.' };
  }
};
