const emojiMix = ['🔥😎', '💀🤣', '😭💔', '✨🙏', '💯👑', '🫡💪', '🤝💰', '🎯🔥', '🚀💫', '👀🤫'];

module.exports = {
  name: 'emoji',
  description: 'Get random emoji mix',
  category: 'fun',
  execute: async () => {
    return { success: true, message: `*_🎲 Emoji Mix:_* *_${emojiMix[Math.floor(Math.random() * emojiMix.length)]}_*` };
  }
};
