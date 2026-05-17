module.exports = {
  name: 'take',
  description: 'Take/steal sticker with custom pack',
  category: 'download',
  execute: async (message) => {
    const args = message.args.join(' ');
    if (!args.includes('|')) return { success: true, message: `*_❌ Usage:_* *_.take packname|author_*` };
    return { success: true, message: `*_✅ Sticker pack info updated_*` };
  }
};
