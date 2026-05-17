const ytdl = require('@distube/ytdl-core');

module.exports = {
  name: 'ytmp3',
  description: 'Download YouTube audio',
  category: 'download',
  execute: async (message, botInstance) => {
    const url = message.args[0];
    if (!url) return { success: false, message: `*_❌ Please provide a YouTube URL_*\n\n*_Usage:_* *_.ytmp3 <url>_*` };

    try {
      const info = await ytdl.getInfo(url);
      const title = info.videoDetails.title;
      const audioStream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
      const chunks = [];
      for await (const chunk of audioStream) chunks.push(chunk);
      const buffer = Buffer.concat(chunks);

      await botInstance.socket.sendMessage(message.from, {
        audio: buffer,
        mimetype: 'audio/mp4',
        fileName: `${title}.mp3`,
        ptt: false
      });
      return { handled: true };
    } catch (e) {
      return { success: false, message: `*_❌ Failed to download:_* *_${e.message}_*` };
    }
  }
};
