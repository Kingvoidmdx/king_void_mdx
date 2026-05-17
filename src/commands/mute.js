module.exports = {
  name: 'mute',
  description: 'Mute the group (only admins can send)',
  category: 'group',
  execute: async (message, botInstance) => {
    if (!message.from.endsWith('@g.us')) return { message: `*_❌ This command can only be used in groups_*` };
    try {
      await botInstance.socket.groupSettingUpdate(message.from, 'announcement');
      return { message: `*_🔇 Group has been muted. Only admins can send messages._*` };
    } catch (e) {
      return { message: `*_❌ Failed to mute:_* *_${e.message}_*` };
    }
  }
};
