module.exports = {
  name: 'gpt',
  description: 'Chat with GPT-powered AI',
  category: 'tools',
  execute: async (message, botInstance) => {
    const query = message.args.join(' ');
    if (!query) return { success: true, message: `*_❌ Usage:_* *_.gpt <question>_*` };
    if (botInstance.ai) {
      const reply = await botInstance.ai.generateResponse(message.from, query, false, false);
      return { success: true, message: reply };
    }
    return { success: true, message: `*_🤖 VOID X AI is not ready yet_*` };
  }
};
