module.exports = {
  name: 'cute',
  description: 'Check how cute you are',
  category: 'fun',
  execute: async (message) => {
    const target = message.args[0] || message.from?.split('@')[0] || 'You';
    const level = Math.floor(Math.random() * 101);
    return { success: true, message: `*_🥰 CUTE RATE_*

*_${target}:_* *_${level}% cute_* 🎀` };
  }
};
