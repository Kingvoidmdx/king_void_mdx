module.exports = {
  name: 'alive',
  description: 'Check if bot is alive',
  category: 'utility',
  execute: async (message, botInstance) => {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const mins = Math.floor((uptime % 3600) / 60);
    const secs = Math.floor(uptime % 60);
    return { success: true, message: `✅ I am alive! Uptime: ${hours}h ${mins}m ${secs}s` };
  }
};
