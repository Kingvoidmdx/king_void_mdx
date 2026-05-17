module.exports = {
  name: 'demote',
  description: 'Demote admin to member',
  category: 'group',
  execute: async (message, botInstance) => {
    if (!message.from.endsWith('@g.us')) return { message: `*_❌ This command can only be used in groups_*` };
    const target = message.args[0];
    if (!target) return { message: `*_❌ Please mention an admin to demote_*\n\n*_Usage:_* *_.demote @user_*` };
    try {
      const jid = target.includes('@') ? target : `${target}@s.whatsapp.net`;
      await botInstance.socket.groupParticipantsUpdate(message.from, [jid], 'demote');
      return { message: `*_⬇️ Demoted to member:_* *_${target}_*` };
    } catch (e) {
      return { message: `*_❌ Failed to demote:_* *_${e.message}_*` };
    }
  }
};
