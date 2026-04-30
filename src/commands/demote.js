module.exports = {
  name: 'demote',
  description: 'Demote admin to member (placeholder)',
  category: 'group',
  execute: async (message, botInstance) => {
    const num = (message.args && message.args[0]) || 'number';
    return { success: true, message: `⬇️ ${num} demoted (placeholder).` };
  }
};
