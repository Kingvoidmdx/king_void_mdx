module.exports = {
  name: 'time',
  description: 'Show current time',
  category: 'tools',
  execute: async () => {
    const now = new Date();
    return { success: true, message: `*_🕐 Current Time_*

*_${now.toLocaleString()}_*` };
  }
};
