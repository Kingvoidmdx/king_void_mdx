module.exports = {
  name: 'add',
  description: 'Add a member to group',
  category: 'group',
  execute: async (message, botInstance) => {
    if (!message.from.endsWith('@g.us')) return { message: `*_❌ This command can only be used in groups_*` };
    const target = message.args[0];
    if (!target) return { message: `*_❌ Please provide number to add_*\n\n*_Usage:_* *_.add 234812345678_*` };
    try {
      const jid = target.includes('@') ? target : `${target.replace(/[^0-9]/g, '')}@s.whatsapp.net`;
      await botInstance.socket.groupParticipantsUpdate(message.from, [jid], 'add');
      return { message: `*_➕ Added:_* *_${target}_*` };
    } catch (e) {
      return { message: `*_❌ Failed to add:_* *_${e.message}_*` };
    }
  }
};
