module.exports = {
  name: 'ginfo',
  description: 'Show group info',
  category: 'group',
  execute: async (message, botInstance) => {
    if (!message.from.endsWith('@g.us')) return { message: `*_❌ This command can only be used in groups_*` };
    try {
      const meta = await botInstance.socket.groupMetadata(message.from);
      const admins = meta.participants.filter(p => p.admin).length;
      const members = meta.participants.length;
      const info = `*_📋 GROUP INFO_*\n\n*_Name:_* *_${meta.subject}_*\n*_ID:_* *_${meta.id}_*\n*_Members:_* *_${members}_*\n*_Admins:_* *_${admins}_*\n*_Created:_* *_${new Date(meta.creation * 1000).toLocaleDateString()}_*\n*_Description:_* *_${meta.desc || 'None'}_*`;
      return { message: info };
    } catch (e) {
      return { message: `*_❌ Failed to fetch group info:_* *_${e.message}_*` };
    }
  }
};
