module.exports = {
  name: 'invite',
  description: 'Create group invite link (placeholder)',
  category: 'group',
  execute: async (message, botInstance) => {
    return { success: true, message: '🔗 Group invite link: https://chat.whatsapp.com/placeholder' };
  }
};
