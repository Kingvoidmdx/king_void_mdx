const { getSession, saveSession } = require('../database/sessions');

module.exports = {
  name: 'antilink',
  description: 'Toggle anti-link protection',
  category: 'group',
  execute: async (message) => {
    if (!message.from.endsWith('@g.us')) return { message: `*_❌ This command can only be used in groups_*` };
    try {
      const key = `setting_${message.from}_antilink`;
      const data = await getSession(key) || { enabled: false };
      data.enabled = !data.enabled;
      await saveSession(key, data);
      return { message: `*_🔗 Anti-link protection:_* *_${data.enabled ? '✅ ON' : '❌ OFF'}_*` };
    } catch (e) {
      return { message: `*_❌ Failed to toggle:_* *_${e.message}_*` };
    }
  }
};
