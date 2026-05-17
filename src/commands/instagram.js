const { instagramGetUrl } = require('instagram-url-direct');

module.exports = {
  name: 'instagram',
  description: 'Download Instagram media',
  category: 'download',
  execute: async (message, botInstance) => {
    const url = message.args[0];
    if (!url) return { success: false, message: `*_❌ Please provide an Instagram URL_*\n\n*_Usage:_* *_.instagram <url>_*` };

    try {
      const result = await instagramGetUrl(url);
      const mediaList = result?.url_list || result?.urls || result?.data;
      if (!mediaList || mediaList.length === 0) {
        return { success: false, message: `*_❌ Could not fetch media from that URL_*` };
      }

      for (const mediaUrl of mediaList) {
        await botInstance.socket.sendMessage(message.from, {
          video: { url: mediaUrl },
          caption: `*_📸 Instagram Download_*`
        });
      }
      return { handled: true };
    } catch (e) {
      return { success: false, message: `*_❌ Download failed:_* *_${e.message}_*` };
    }
  }
};
