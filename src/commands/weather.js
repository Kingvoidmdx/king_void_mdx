module.exports = {
  name: 'weather',
  description: 'Check weather for a city',
  category: 'tools',
  execute: async (message) => {
    const city = message.args.join(' ');
    if (!city) return { success: true, message: `*_❌ Usage:_* *_.weather <city>_*` };
    return { success: true, message: `*_🌤 Weather for:_* *_${city}_*

*_⚠️ Requires weather API key_*` };
  }
};
