module.exports = {
  name: 'ping',
  description: 'Check bot response speed',
  category: 'general',
  execute: async (message, botInstance) => {
    const start = Date.now();
    const response = `*_🏓 PONG!_\*

*_📊 Status:_* *_ACTIVE_*
*_⏱ Response:_* *_${Date.now() - start}ms_*
*_🤖 Bot:_* *_VOID X_*`;
    return { success: true, message: response };
  }
};
