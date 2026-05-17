module.exports = {
  name: 'toimg',
  description: 'Convert sticker to image',
  category: 'tools',
  execute: async () => {
    return { success: true, message: `*_🖼️ Reply to a sticker with .toimg to convert it to an image_*` };
  }
};
