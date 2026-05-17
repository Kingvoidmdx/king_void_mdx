module.exports = {
  name: 'ssweb',
  description: 'Screenshot a website',
  category: 'tools',
  execute: async (message) => {
    const url = message.args[0];
    if (!url) return { success: true, message: `*_❌ Usage:_* *_.ssweb <url>_*` };
    return { success: true, message: `*_📸 Taking screenshot of:_* *_${url}_*_..._*` };
  }
};
