const twitterDownloader = require('twitter-downloader');

module.exports = {
  name: 'twitter',
  description: 'Download Twitter/X media',
  category: 'download',
  execute: async (message, botInstance) => {
    const url = message.args[0];
    if (!url) return { success: false, message: `*_❌ Please provide a Twitter/X URL_*\n\n*_Usage:_* *_.twitter <url>_*` };

    try {
      const result = await twitterDownloader(url);
      const media = result?.result?.media?.[0] || result?.data?.[0];
      if (!media) return { success: false, message: `*_❌ Could not fetch media from that URL_*` };

      const mediaUrl = media.url || media.video || media.videoUrl || media.downloadUrl;
      if (!mediaUrl) return { success: false, message: `*_❌ No downloadable media found_*` };

      const isVideo = mediaUrl.includes('.mp4') || media.type === 'video';
      if (isVideo) {
        await botInstance.socket.sendMessage(message.from, {
          video: { url: mediaUrl },
          caption: `*_🐦 Twitter/X Download_*`
        });
      } else {
        await botInstance.socket.sendMessage(message.from, {
          image: { url: mediaUrl },
          caption: `*_🐦 Twitter/X Download_*`
        });
      }
      return { handled: true };
    } catch (e) {
      return { success: false, message: `*_❌ Download failed:_* *_${e.message}_*` };
    }
  }
};
