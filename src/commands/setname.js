module.exports = {
  name: 'setname',
  description: 'Set group name (placeholder)',
  category: 'group',
  execute: async (message, botInstance) => {
    const name = (message.args && message.args.join(' ')) || '';
    return { success: true, message: `🪪 Group name set to: ${name} (placeholder).` };
  }
};
