const ytsr = require('ytsr');
const ytdl = require('@distube/ytdl-core');

module.exports = {
  name: 'play',
  description: 'Play audio from YouTube',
  category: 'download',
  execute: async (message, botInstance) => {
    const query = message.args.join(' ');
    if (!query) return { success: false, message: `*_❌ Please provide a song name_*\n\n*_Usage:_* *_.play <song name>_*` };

    try {
      const search = await ytsr(query, { limit: 1 });
      const video = search.items.find(i => i.type === 'video');
      if (!video) return { success: false, message: `*_❌ No results found for:_* *_${query}_*` };

      const url = video.url;
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
      return { success: false, message: `*_❌ Failed to play:_* *_${e.message}_*` };
    }
  }
};
