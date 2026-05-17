const ytdl = require('@distube/ytdl-core');

module.exports = {
  name: 'ytmp4',
  description: 'Download YouTube video',
  category: 'download',
  execute: async (message, botInstance) => {
    const url = message.args[0];
    if (!url) return { success: false, message: `*_❌ Please provide a YouTube URL_*\n\n*_Usage:_* *_.ytmp4 <url>_*` };

    try {
      const info = await ytdl.getInfo(url);
      const title = info.videoDetails.title;
      const videoStream = ytdl(url, { filter: 'audioandvideo', quality: 'highest' });
      const chunks = [];
      for await (const chunk of videoStream) chunks.push(chunk);
      const buffer = Buffer.concat(chunks);

      await botInstance.socket.sendMessage(message.from, {
        video: buffer,
        caption: `*_🎬 ${title}_*`,
        mimetype: 'video/mp4'
      });
      return { handled: true };
    } catch (e) {
      return { success: false, message: `*_❌ Failed to download:_* *_${e.message}_*` };
    }
  }
};
