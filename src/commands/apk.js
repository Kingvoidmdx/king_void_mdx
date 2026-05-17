const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
  name: 'apk',
  description: 'Search and download APK',
  category: 'download',
  execute: async (message, botInstance) => {
    const query = message.args.join(' ');
    if (!query) return { success: false, message: `*_❌ Please provide an app name_*\n\n*_Usage:_* *_.apk <app name>_*` };

    try {
      const searchUrl = `https://apkpure.net/search?q=${encodeURIComponent(query)}`;
      const res = await fetch(searchUrl);
      const html = await res.text();
      const $ = cheerio.load(html);

      const firstLink = $('a[href*="/apk/"]').first();
      const detailUrl = 'https://apkpure.net' + firstLink.attr('href');
      if (!detailUrl) return { success: false, message: `*_❌ No APK found for:_* *_${query}_*` };

      const detailRes = await fetch(detailUrl);
      const detailHtml = await detailRes.text();
      const $$ = cheerio.load(detailHtml);

      const downloadLink = $$('a[href*="download"]').first().attr('href') ||
                           $$('a.download-btn').first().attr('href');
      if (!downloadLink) return { success: false, message: `*_❌ Could not find download link for:_* *_${query}_*` };

      const finalUrl = downloadLink.startsWith('http') ? downloadLink : 'https://apkpure.net' + downloadLink;

      await botInstance.socket.sendMessage(message.from, {
        document: { url: finalUrl },
        fileName: `${query.replace(/\s+/g, '_')}.apk`,
        caption: `*_📱 APK Download_*\n*_App:_* *_${query}_*\n*_✅ Success_*`
      });
      return { handled: true };
    } catch (e) {
      return { success: false, message: `*_❌ APK search failed:_* *_${e.message}_*` };
    }
  }
};
