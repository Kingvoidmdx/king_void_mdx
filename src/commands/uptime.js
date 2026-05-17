module.exports = {
  name: 'uptime',
  description: 'Show bot uptime',
  category: 'general',
  execute: async () => {
    const s = process.uptime();
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    return { success: true, message: `*_🤖 VOID X Uptime_*

*_${d}d ${h}h ${m}m ${sec}s_*` };
  }
};
