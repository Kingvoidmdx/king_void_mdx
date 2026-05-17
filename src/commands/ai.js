module.exports = {
  name: 'ai',
  description: 'Ask AI a question',
  category: 'tools',
  execute: async (message, botInstance) => {
    const query = message.args.join(' ');
    if (!query) return { success: true, message: `*_❌ Usage:_* *_.ai <question>_*` };
    if (botInstance.ai) {
      const reply = await botInstance.ai.generateResponseNoMemory(query);
      return { success: true, message: reply };
    }
    return { success: true, message: `*_AI is not initialized yet_*` };
  }
};
