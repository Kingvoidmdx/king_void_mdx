const { getSession, saveSession } = require('../database/sessions');

module.exports = {
  name: 'goodbye',
  description: 'Toggle goodbye messages for leaving members',
  category: 'group',
  execute: async (message) => {
    if (!message.from.endsWith('@g.us')) return { message: `*_❌ This command can only be used in groups_*` };
    try {
      const key = `setting_${message.from}_goodbye`;
      const data = await getSession(key) || { enabled: false };
      data.enabled = !data.enabled;
      await saveSession(key, data);
      return { message: `*_👋 Goodbye messages:_* *_${data.enabled ? '✅ ON' : '❌ OFF'}_*` };
    } catch (e) {
      return { message: `*_❌ Failed to toggle:_* *_${e.message}_*` };
    }
  }
};
