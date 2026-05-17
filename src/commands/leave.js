module.exports = {
  name: 'leave',
  description: 'Leave current group',
  category: 'owner',
  ownerOnly: true,
  execute: async (message, botInstance) => {
    if (!message.from.endsWith('@g.us')) return { message: `*_❌ This command can only be used in groups_*` };
    try {
      await botInstance.socket.sendMessage(message.from, { text: `*_👋 Goodbye! Leaving group..._*` });
      await botInstance.socket.groupLeave(message.from);
      return { handled: true };
    } catch (e) {
      return { message: `*_❌ Failed to leave:_* *_${e.message}_*` };
    }
  }
};
