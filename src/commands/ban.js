const { getSession, saveSession } = require('../database/sessions');

module.exports = {
  name: 'ban',
  description: 'Ban a user from bot',
  category: 'owner',
  ownerOnly: true,
  execute: async (message) => {
    const target = message.args[0];
    if (!target) return { message: `*_❌ Usage:_* *_.ban @user_*` };
    try {
      const jid = target.includes('@') ? target : `${target}@s.whatsapp.net`;
      const banned = await getSession('banned_users') || { users: [] };
      if (banned.users.includes(jid)) return { message: `*_⚠️ ${target} is already banned_*` };
      banned.users.push(jid);
      await saveSession('banned_users', banned);
      return { message: `*_🔨 Banned:_* *_${target}_*` };
    } catch (e) {
      return { message: `*_❌ Failed to ban:_* *_${e.message}_*` };
    }
  }
};
