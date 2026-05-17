module.exports = {
  name: 'alive',
  description: 'Check if bot is alive',
  category: 'general',
  execute: async (message, botInstance) => {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const mins = Math.floor((uptime % 3600) / 60);
    const secs = Math.floor(uptime % 60);
    return { success: true, message: `*_✅ VOID X 🤖 is alive!_\*

*_⏱ Uptime:_* *_${hours}h ${mins}m ${secs}s_*
*_💚 Status:_* *_Running smoothly_*` };
  }
};
