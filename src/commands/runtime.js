module.exports = {
  name: 'runtime',
  description: 'Show bot runtime',
  category: 'general',
  execute: async (message, botInstance) => {
    const seconds = process.uptime();
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return { success: true, message: `*_🤖 VOID X Runtime_*

*_📅 Days:_* *_${d}_*
*_🕐 Hours:_* *_${h}_*
*_⏱ Minutes:_* *_${m}_*
*_⏲ Seconds:_* *_${s}_*` };
  }
};
