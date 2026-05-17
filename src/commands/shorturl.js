module.exports = {
  name: 'shorturl',
  description: 'Shorten a URL',
  category: 'tools',
  execute: async (message) => {
    const url = message.args[0];
    if (!url) return { success: true, message: `*_❌ Usage:_* *_.shorturl <url>_*` };
    return { success: true, message: `*_🔗 Shortened:_* *_${url}_*

*_⚠️ Requires bitly/tinyurl API key_*` };
  }
};
