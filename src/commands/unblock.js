module.exports = {
  name: 'unblock',
  description: 'Unblock a user',
  category: 'owner',
  ownerOnly: true,
  execute: async (message, botInstance) => {
    const target = message.args[0];
    if (!target) return { message: `*_❌ Usage:_* *_.unblock @user_*` };
    try {
      const jid = target.includes('@') ? target : `${target}@s.whatsapp.net`;
      await botInstance.socket.updateBlockStatus(jid, 'unblock');
      return { message: `*_✅ Unblocked:_* *_${target}_*` };
    } catch (e) {
      return { message: `*_❌ Failed to unblock:_* *_${e.message}_*` };
    }
  }
};
