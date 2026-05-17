module.exports = {
  name: 'attp',
  description: 'Animated text to sticker',
  category: 'download',
  execute: async (message) => {
    const text = message.args.join(' ');
    if (!text) return { success: true, message: `*_❌ Please provide text_*

*_Usage:_* *_.attp <text>_*` };
    return { success: true, message: `*_🎨 Creating animated text sticker for:_* *_${text}_*` };
  }
};
