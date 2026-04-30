module.exports = {
  name: 'sticker',
  description: 'Create a sticker from text (placeholder)',
  category: 'fun',
  execute: async (message, botInstance) => {
    const text = (message.args && message.args.join(' ')) || 'Sticker';
    return { success: true, message: `🟦 Sticker created from text: ${text}` };
  }
};
