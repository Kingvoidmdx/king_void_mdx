module.exports = {
  name: 'add',
  description: 'Add user to group (placeholder)',
  category: 'group',
  execute: async (message, botInstance) => {
    const num = (message.args && message.args[0]) || 'number';
    return { success: true, message: `➕ Attempted to add ${num} (placeholder).` };
  }
};
