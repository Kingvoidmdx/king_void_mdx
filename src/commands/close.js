module.exports = {
  name: 'close',
  description: 'Close group for members',
  category: 'group',
  execute: async (message, botInstance) => {
    if (!message.from.endsWith('@g.us')) return { message: `*_❌ This command can only be used in groups_*` };
    try {
      await botInstance.socket.groupSettingUpdate(message.from, 'announcement');
      return { message: `*_🔒 Group has been closed_*` };
    } catch (e) {
      return { message: `*_❌ Failed:_* *_${e.message}_*` };
    }
  }
};
