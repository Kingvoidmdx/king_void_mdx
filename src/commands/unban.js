const { getSession, saveSession } = require('../database/sessions');

module.exports = {
  name: 'unban',
  description: 'Unban a user',
  category: 'owner',
  ownerOnly: true,
  execute: async (message) => {
    const target = message.args[0];
    if (!target) return { message: `*_❌ Usage:_* *_.unban @user_*` };
    try {
      const jid = target.includes('@') ? target : `${target}@s.whatsapp.net`;
      const banned = await getSession('banned_users') || { users: [] };
      if (!banned.users.includes(jid)) return { message: `*_⚠️ ${target} is not banned_*` };
      banned.users = banned.users.filter(u => u !== jid);
      await saveSession('banned_users', banned);
      return { message: `*_✅ Unbanned:_* *_${target}_*` };
    } catch (e) {
      return { message: `*_❌ Failed to unban:_* *_${e.message}_*` };
    }
  }
};
