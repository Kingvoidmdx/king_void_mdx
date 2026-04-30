module.exports = {
  name: 'settings',
  description: 'Show current bot settings (basic)',
  category: 'owner',
  execute: async (message, botInstance) => {
    const settings = {
      prefixDefault: '.',
      pairing: process.env.PAIRING_METHOD || 'both',
      admin: process.env.ADMIN_NUMBER || 'NOT_SET'
    };
    return { success: true, message: '⚙️ Settings:\n' + JSON.stringify(settings, null, 2) };
  }
};
