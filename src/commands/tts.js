module.exports = {
  name: 'tts',
  description: 'Text to speech (simple placeholder)',
  category: 'utility',
  execute: async (message, botInstance) => {
    const text = (message.args && message.args.join(' ')) || 'Hello from Queen Akuma';
    return { success: true, message: `🔊 [TTS] ${text}` };
  }
};
