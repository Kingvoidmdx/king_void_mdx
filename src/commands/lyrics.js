module.exports = {
  name: 'lyrics',
  description: 'Get song lyrics',
  category: 'tools',
  execute: async (message) => {
    const song = message.args.join(' ');
    if (!song) return { success: true, message: `*_❌ Usage:_* *_.lyrics <song name>_*` };
    return { success: true, message: `*_🎵 Searching lyrics for:_* *_${song}_*_..._*` };
  }
};
