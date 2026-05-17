const fbDownloader = require('fb-downloader');

module.exports = {
  name: 'facebook',
  description: 'Download Facebook video',
  category: 'download',
  execute: async (message, botInstance) => {
    const url = message.args[0];
    if (!url) return { success: false, message: `*_❌ Please provide a Facebook URL_*\n\n*_Usage:_* *_.facebook <url>_*` };

    try {
      const result = await fbDownloader(url);
      const videoUrl = result?.hd || result?.sd || result?.url;
      if (!videoUrl) return { success: false, message: `*_❌ Could not fetch video from that URL_*` };

      await botInstance.socket.sendMessage(message.from, {
        video: { url: videoUrl },
        caption: `*_📹 Facebook Download_*\n*_✅ Success_*`
      });
      return { handled: true };
    } catch (e) {
      return { success: false, message: `*_❌ Download failed:_* *_${e.message}_*` };
    }
  }
};
