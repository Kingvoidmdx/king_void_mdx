module.exports = {
  name: 'fancy',
  description: 'Transform text to a fancy font',
  category: 'fun',
  execute: async (message, botInstance) => {
    const text = (message.args && message.args.join(' ')) || 'Queen Akuma';
    // simple stylize: add combining characters
    const fancy = text.split('').map(c => c + '͢').join('');
    return { success: true, message: fancy };
  }
};
