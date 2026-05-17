module.exports = {
  name: 'unmute',
  description: 'Unmute the group (all members can send)',
  category: 'group',
  execute: async (message, botInstance) => {
    if (!message.from.endsWith('@g.us')) return { message: `*_❌ This command can only be used in groups_*` };
    try {
      await botInstance.socket.groupSettingUpdate(message.from, 'not_announcement');
      return { message: `*_🔊 Group has been unmuted. All members can send messages._*` };
    } catch (e) {
      return { message: `*_❌ Failed to unmute:_* *_${e.message}_*` };
    }
  }
};
