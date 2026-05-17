module.exports = {
  name: 'admins',
  description: 'List group admins',
  category: 'group',
  execute: async (message, botInstance) => {
    if (!message.from.endsWith('@g.us')) return { message: `*_❌ This command can only be used in groups_*` };
    try {
      const meta = await botInstance.socket.groupMetadata(message.from);
      const admins = meta.participants.filter(p => p.admin);
      if (admins.length === 0) return { message: `*_👑 No group admins found_*` };
      const list = admins.map((a, i) => `${i + 1}. @${a.id.split('@')[0]} (${a.admin === 'superadmin' ? '👑 Super Admin' : '👤 Admin'})`).join('\n');
      const mentions = admins.map(a => a.id);
      await botInstance.socket.sendMessage(message.from, {
        text: `*_👑 GROUP ADMINS (${admins.length})_*\n\n${list}`,
        mentions
      });
      return { handled: true };
    } catch (e) {
      return { message: `*_❌ Failed to fetch admins:_* *_${e.message}_*` };
    }
  }
};
