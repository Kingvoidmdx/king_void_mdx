module.exports = {
  name: 'promote',
  description: 'Promote member to admin',
  category: 'group',
  execute: async (message, botInstance) => {
    if (!message.from.endsWith('@g.us')) return { message: `*_❌ This command can only be used in groups_*` };
    const target = message.args[0];
    if (!target) return { message: `*_❌ Please mention a member to promote_*\n\n*_Usage:_* *_.promote @user_*` };
    try {
      const jid = target.includes('@') ? target : `${target}@s.whatsapp.net`;
      await botInstance.socket.groupParticipantsUpdate(message.from, [jid], 'promote');
      return { message: `*_⬆️ Promoted to admin:_* *_${target}_*` };
    } catch (e) {
      return { message: `*_❌ Failed to promote:_* *_${e.message}_*` };
    }
  }
};
