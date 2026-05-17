module.exports = {
  name: 'tagall',
  description: 'Tag all group members',
  category: 'group',
  execute: async (message, botInstance) => {
    if (!message.from.endsWith('@g.us')) return { message: `*_❌ This command can only be used in groups_*` };
    try {
      const meta = await botInstance.socket.groupMetadata(message.from);
      const participants = meta.participants.map(p => p.id);
      const text = message.args.length ? message.args.join(' ') : '*_📢 Attention all members!_*';
      await botInstance.socket.sendMessage(message.from, { text, mentions: participants });
      return { handled: true };
    } catch (e) {
      return { message: `*_❌ Failed to tag all:_* *_${e.message}_*` };
    }
  }
};
