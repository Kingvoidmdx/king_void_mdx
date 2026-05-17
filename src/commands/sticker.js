module.exports = {
  name: 'sticker',
  description: 'Make sticker from image',
  category: 'download',
  execute: async (message) => {
    return { success: true, message: `*_🖼️ Send an image with caption .sticker to make a sticker_*` };
  }
};
