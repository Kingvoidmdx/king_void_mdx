module.exports = {
  name: 'movie',
  description: 'Search movie info',
  category: 'tools',
  execute: async (message) => {
    const title = message.args.join(' ');
    if (!title) return { success: true, message: `*_❌ Usage:_* *_.movie <title>_*` };
    return { success: true, message: `*_🎬 Searching for:_* *_${title}_*_..._*` };
  }
};
