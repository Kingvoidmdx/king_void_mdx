const { getSession, saveSession } = require('../database/sessions');

module.exports = {
  name: 'warn',
  description: 'Warn a group member',
  category: 'group',
  execute: async (message, botInstance) => {
    if (!message.from.endsWith('@g.us')) return { message: `*_❌ This command can only be used in groups_*` };
    const target = message.args[0];
    if (!target) return { message: `*_❌ Please mention a member to warn_*\n\n*_Usage:_* *_.warn @user [reason]_*` };
    try {
      const jid = target.includes('@') ? target : `${target}@s.whatsapp.net`;
      const reason = message.args.slice(1).join(' ') || 'No reason';
      const key = `warn_${message.from}_${jid}`;
      const data = await getSession(key) || { count: 0, reasons: [] };
      data.count++;
      data.reasons.push(reason);
      data.lastWarned = new Date().toISOString();
      await saveSession(key, data);
      return { message: `*_⚠️ Warning issued to:_* *_${target}_*\n*_Warn count:_* *_${data.count}/3_*\n*_Reason:_* *_${reason}_*\n\n*_3 warnings = kicked from group_*` };
    } catch (e) {
      return { message: `*_❌ Failed to warn:_* *_${e.message}_*` };
    }
  }
};
