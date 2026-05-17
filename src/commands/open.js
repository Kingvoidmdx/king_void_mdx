module.exports = {
  name: 'open',
  description: 'Open group for all to send messages',
  category: 'group',
  execute: async (message, botInstance) => {
    if (!message.from.endsWith('@g.us')) return { message: `*_❌ This command can only be used in groups_*` };
    try {
      await botInstance.socket.groupSettingUpdate(message.from, 'not_announcement');
      return { message: `*_🔓 Group has been opened_*` };
    } catch (e) {
      return { message: `*_❌ Failed:_* *_${e.message}_*` };
    }
  }
};
