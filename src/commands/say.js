module.exports = {
  name: 'say',
  description: 'Make the bot say something',
  category: 'fun',
  execute: async (message) => {
    const text = message.args.join(' ');
    if (!text) return { success: true, message: `*_❌ Usage:_* *_.say <message>_*` };
    return { success: true, message: `*_${text}_*` };
  }
};
