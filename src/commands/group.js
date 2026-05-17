module.exports = {
  name: 'group',
  description: 'Group management (open/close)',
  category: 'group',
  execute: async (message, botInstance) => {
    if (!message.from.endsWith('@g.us')) return { message: `*_❌ This command can only be used in groups_*` };
    const sub = message.args[0]?.toLowerCase();
    try {
      if (sub === 'open') {
        await botInstance.socket.groupSettingUpdate(message.from, 'not_announcement');
        return { message: `*_🔓 Group has been opened for all members to send messages_*` };
      } else if (sub === 'close') {
        await botInstance.socket.groupSettingUpdate(message.from, 'announcement');
        return { message: `*_🔒 Group has been closed. Only admins can send messages_*` };
      }
      return { message: `*_❌ Usage:_* *_.group open_* *_or_* *_.group close_*` };
    } catch (e) {
      return { message: `*_❌ Failed:_* *_${e.message}_*` };
    }
  }
};
