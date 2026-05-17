module.exports = {
  name: 'block',
  description: 'Block a user',
  category: 'owner',
  ownerOnly: true,
  execute: async (message, botInstance) => {
    const target = message.args[0];
    if (!target) return { message: `*_❌ Usage:_* *_.block @user_*` };
    try {
      const jid = target.includes('@') ? target : `${target}@s.whatsapp.net`;
      await botInstance.socket.updateBlockStatus(jid, 'block');
      return { message: `*_🚫 Blocked:_* *_${target}_*` };
    } catch (e) {
      return { message: `*_❌ Failed to block:_* *_${e.message}_*` };
    }
  }
};
