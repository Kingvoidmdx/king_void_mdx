module.exports = {
  name: 'close',
  description: 'Close group to messages (placeholder)',
  category: 'group',
  execute: async (message, botInstance) => {
    return { success: true, message: '🔒 Group set to closed (placeholder).' };
  }
};
