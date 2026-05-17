module.exports = {
  name: 'join',
  description: 'Join a group via invite link',
  category: 'owner',
  ownerOnly: true,
  execute: async (message, botInstance) => {
    const link = message.args[0];
    if (!link) return { message: `*_❌ Usage:_* *_.join <invite link>_*` };
    try {
      const code = link.split('chat.whatsapp.com/')[1] || link;
      const res = await botInstance.socket.groupAcceptInvite(code);
      return { message: `*_🔗 Joined group successfully!_*\n*_ID:_* *_${res}_*` };
    } catch (e) {
      return { message: `*_❌ Failed to join:_* *_${e.message}_*` };
    }
  }
};
