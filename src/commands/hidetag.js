module.exports = {
  name: 'hidetag',
  description: 'Send hidden tag message',
  category: 'group',
  execute: async (message, botInstance) => {
    if (!message.from.endsWith('@g.us')) return { message: `*_❌ This command can only be used in groups_*` };
    const text = message.args.join(' ');
    if (!text) return { message: `*_❌ Please provide a message_*\n\n*_Usage:_* *_.hidetag <text>_*` };
    try {
      const meta = await botInstance.socket.groupMetadata(message.from);
      const participants = meta.participants.map(p => p.id);
      await botInstance.socket.sendMessage(message.from, { text, mentions: participants });
      return { handled: true };
    } catch (e) {
      return { message: `*_❌ Failed:_* *_${e.message}_*` };
    }
  }
};
