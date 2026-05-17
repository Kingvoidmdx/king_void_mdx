const tiktok = require('@tobyg74/tiktok-api-dl');

module.exports = {
  name: 'tiktok',
  description: 'Download TikTok video',
  category: 'download',
  execute: async (message, botInstance) => {
    const url = message.args[0];
    if (!url) return { success: false, message: `*_❌ Please provide a TikTok URL_*\n\n*_Usage:_* *_.tiktok <url>_*` };

    try {
      const result = await tiktok(url, { version: 'v1' });
      if (!result?.result?.videoHD && !result?.result?.video) {
        return { success: false, message: `*_❌ Could not fetch video from that URL_*` };
      }

      const videoUrl = result.result.videoHD || result.result.video[0] || result.result.video;
      await botInstance.socket.sendMessage(message.from, {
        video: { url: videoUrl },
        caption: `*_🎵 TikTok Download_*\n*_✅ Success_*`
      });
      return { handled: true };
    } catch (e) {
      return { success: false, message: `*_❌ Download failed:_* *_${e.message}_*` };
    }
  }
};
