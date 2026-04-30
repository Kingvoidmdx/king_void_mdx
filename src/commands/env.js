module.exports = {
  name: 'env',
  description: 'Show selected environment variables',
  category: 'utility',
  execute: async (message, botInstance) => {
    const allowed = ['BOT_NAME','BOT_VERSION','ADMIN_NUMBER','PORT'];
    const lines = allowed.map(k => `${k}=${process.env[k] || ''}`);
    return { success: true, message: lines.join('\n') };
  }
};
