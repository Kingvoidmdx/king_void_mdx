const os = require('os');
module.exports = {
  name: 'bot_stats',
  description: 'Show bot statistics',
  category: 'utility',
  execute: async (message, botInstance) => {
    const mem = process.memoryUsage();
    const msg = `📊 Bot Stats\n- RSS: ${Math.round(mem.rss/1024/1024)} MB\n- Heap Total: ${Math.round(mem.heapTotal/1024/1024)} MB\n- Heap Used: ${Math.round(mem.heapUsed/1024/1024)} MB\n- CPUs: ${os.cpus().length}\n- Platform: ${os.platform()}`;
    return { success: true, message: msg };
  }
};
