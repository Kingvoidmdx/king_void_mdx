module.exports = {
  name: 'kick',
  description: 'Kick a member from group',
  category: 'group',
  execute: async (message, botInstance) => {
    if (!message.from.endsWith('@g.us')) return { message: `*_❌ This command can only be used in groups_*` };
    const target = message.args[0];
    if (!target) return { message: `*_❌ Please mention or provide number to kick_*\n\n*_Usage:_* *_.kick @user_*` };
    try {
      const jid = target.includes('@') ? target : `${target}@s.whatsapp.net`;
      await botInstance.socket.groupParticipantsUpdate(message.from, [jid], 'remove');
      return { message: `*_👢 Kicked:_* *_${target}_*` };
    } catch (e) {
      return { message: `*_❌ Failed to kick:_* *_${e.message}_*` };
    }
  }
};
