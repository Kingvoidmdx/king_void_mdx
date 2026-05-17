const mediafire = require('mediafire-dl');

module.exports = {
  name: 'mediafire',
  description: 'Download from MediaFire',
  category: 'download',
  execute: async (message, botInstance) => {
    const url = message.args[0];
    if (!url) return { success: false, message: `*_❌ Please provide a MediaFire URL_*\n\n*_Usage:_* *_.mediafire <url>_*` };

    try {
      const result = await mediafire(url);
      const downloadUrl = result?.url || result?.link || result?.download;
      const fileName = result?.name || result?.filename || 'file';

      if (!downloadUrl) return { success: false, message: `*_❌ Could not fetch file from that URL_*` };

      await botInstance.socket.sendMessage(message.from, {
        document: { url: downloadUrl },
        fileName: fileName,
        caption: `*_📁 MediaFire Download_*\n*_✅ Success_*`
      });
      return { handled: true };
    } catch (e) {
      return { success: false, message: `*_❌ Download failed:_* *_${e.message}_*` };
    }
  }
};
