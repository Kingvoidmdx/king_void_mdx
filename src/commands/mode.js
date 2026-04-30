module.exports = {
  name: 'mode',
  description: 'Change bot mode (placeholder)',
  category: 'owner',
  execute: async (message, botInstance) => {
    const m = (message.args && message.args[0]) || 'default';
    return { success: true, message: `🛰️ Mode changed to ${m} (placeholder).` };
  }
};
