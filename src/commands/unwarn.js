const { getSession, saveSession, deleteSession } = require('../database/sessions');

module.exports = {
  name: 'unwarn',
  description: 'Remove warning from member',
  category: 'group',
  execute: async (message, botInstance) => {
    if (!message.from.endsWith('@g.us')) return { message: `*_❌ This command can only be used in groups_*` };
    const target = message.args[0];
    if (!target) return { message: `*_❌ Please mention a member to unwarn_*\n\n*_Usage:_* *_.unwarn @user_*` };
    try {
      const jid = target.includes('@') ? target : `${target}@s.whatsapp.net`;
      const key = `warn_${message.from}_${jid}`;
      const data = await getSession(key);
      if (!data || data.count <= 0) return { message: `*_✅ ${target} has no warnings_*` };
      data.count--;
      if (data.count <= 0) {
        await deleteSession(key);
        return { message: `*_✅ All warnings removed for:_* *_${target}_*` };
      }
      data.reasons.pop();
      await saveSession(key, data);
      return { message: `*_✅ Warning removed for:_* *_${target}_*\n*_Remaining warnings:_* *_${data.count}/3_*` };
    } catch (e) {
      return { message: `*_❌ Failed to unwarn:_* *_${e.message}_*` };
    }
  }
};
