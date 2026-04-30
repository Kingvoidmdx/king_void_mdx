module.exports = {
  name: 'wame',
  description: 'Generate wa.me link for a number',
  category: 'utility',
  execute: async (message, botInstance) => {
    const num = (message.args && message.args[0]) || message.from || '2340000000000';
    const jid = num.includes('@') ? num.split('@')[0] : num;
    return { success: true, message: `https://wa.me/${jid}` };
  }
};
