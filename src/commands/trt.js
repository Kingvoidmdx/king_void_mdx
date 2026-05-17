module.exports = {
  name: 'trt',
  description: 'Translate text',
  category: 'tools',
  execute: async (message) => {
    const text = message.args.join(' ');
    if (!text) return { success: true, message: `*_❌ Usage:_* *_.trt <text>_*` };
    return { success: true, message: `*_🌐 Translation for:_* *_${text}_*

*_⚠️ Requires translate API key_*` };
  }
};
