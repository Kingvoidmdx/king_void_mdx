module.exports = {
  name: 'menu',
  description: 'Show the stylized command menu',
  category: 'utility',
  execute: async (message, botInstance) => {
    const imageUrl = 'https://repgyetdcodkynrbxocg.supabase.co/storage/v1/object/public/images/telegram-1777513538765-5484bfbc.jpg';
    const menu = `*╭───────────◇* \n│ ✧ ʙᴏᴛ ɴᴀᴍᴇ: Qᴜᴇᴇɴ Aᴋᴜᴍᴀ V2\n│ ✧ ᴜsᴇʀ: @120363421660373452\n│ ✧ ᴀᴄᴛɪᴠᴇ ᴜsᴇʀs: 97\n│ ✧ ᴜᴘᴛɪᴍᴇ: 0ʜ 0ᴍ 0s\n│ ✧ ᴍᴇᴍᴏʀʏ: ${Math.round(process.memoryUsage().rss/1024/1024)}ᴍʙ / ${Math.round(require('os').totalmem()/1024/1024)}ᴍʙ\n│ ✧ ᴄᴏᴍᴍᴀɴᴅs: ~40\n│ ✧ ᴅᴇᴠ: Iɴᴄᴏɴɴᴜ Bᴏʏ\n*╰───────────◇*\n\n` +
`╭───『 ᴀᴋᴜᴍᴀ ɢᴇɴᴇʀᴀʟ 』\n│ ▢ alive\n│ ▢ bot_stats\n│ ▢ bot_info\n│ ▢ menu\n│ ▢ allmenu\n│ ▢ bugmenu\n│ ▢ ping\n│ ▢ wame\n│ ▢ env\n│ ▢ pair\n│ ▢ fancy\n╰────────────────────◇\n\n` +
`╭───『 ᴀᴋᴜᴍᴀ ᴅᴏᴡɴʟᴏᴀᴅ 』\n│ ▢ song\n│ ▢ tiktok\n│ ▢ fb\n│ ▢ movie\n│ ▢ video\n│ ▢ ig\n│ ▢ aiimg\n│ ▢ viewonce\n│ ▢ tts\n│ ▢ sticker\n╰───────────◇\n\n` +
`╭───『 ᴀᴋᴜᴍᴀ ᴏᴡɴᴇʀ 』\n│ ▢ setprefix\n│ ▢ settings\n│ ▢ autorecording\n│ ▢ setemojis\n│ ▢ mode\n│ ▢ reactstatus\n│ ▢ autoreact\n│ ▢ antical\n│ ▢ autoviewstatus\n╰───────────◇*\n\n` +
`╭─『 ᴀᴋᴜᴍᴀ ɢʀᴏᴜᴘ 』\n│ ▢ add\n│ ▢ kick\n│ ▢ open\n│ ▢ kickall\n│ ▢ setppgroup\n│ ▢ setdesc\n│ ▢ setname\n│ ▢ online\n│ ▢ close\n│ ▢ invite\n│ ▢ promote\n│ ▢ demote\n╰────────────◇\n\n` +
`╭───『 ᴀᴋᴜᴍᴀ ғᴜɴ 』\n│ ▢ joke\n│ ▢ darkjoke\n│ ▢ waifu\n│ ▢ meme\n│ ▢ dog\n│ ▢ fact\n│ ▢ pickupline\n│ ▢ roast\n│ ▢ lovequote\n│ ▢ quote\n╰────────────◇\n\n` +
`> *© Mᴀᴅᴇ ʙʏ Iɴᴄᴏɴɴᴜ Bᴏʏ*\n\nImage: ${imageUrl}`;
    return { success: true, message: menu };
  }
};
