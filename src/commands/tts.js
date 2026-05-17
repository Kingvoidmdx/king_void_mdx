module.exports = {
  name: 'tts',
  description: 'Text to speech',
  category: 'tools',
  execute: async (message) => {
    const text = message.args.join(' ');
    if (!text) return { success: true, message: `*_❌ Usage:_* *_.tts <text>_*` };
    return { success: true, message: `*_🔊 Text-to-speech for:_* *_${text}_*

*_⚠️ Requires gtts package_*` };
  }
};
