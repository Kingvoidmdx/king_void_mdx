module.exports = {
  name: 'menu',
  description: 'Show command menu',
  category: 'general',
  execute: async (message, botInstance) => {
    const BOT_NAME = 'VOID X';
    const OWNER = '@Kingvoid_dev77';
    const IMAGE = 'https://plain-weur-prod-public.komododecks.com/202605/15/haGewElgOYpDyJVnDo2a/image.jpg';

    const menu = `╔═━━━═══『 ${BOT_NAME} 🤖 』═══━━━═╗
┃ 👑 OWNER: ${OWNER}
╚═━━━═══━━━═══━━━═══━━━═══━━━═╝

┏━━━〔 🟢 GENERAL 〕━━━┓
┃ ✦ .ping
┃ ✦ .menu
┃ ✦ .alive
┃ ✦ .owner
┃ ✦ .runtime
┃ ✦ .uptime
┃ ✦ .repo
┃ ✦ .script
┃ ✦ .support
┃ ✦ .status
┗━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━〔 📥 DOWNLOAD 〕━━━┓
┃ ✦ .tiktok
┃ ✦ .ytmp3
┃ ✦ .ytmp4
┃ ✦ .play
┃ ✦ .playvid
┃ ✦ .instagram
┃ ✦ .facebook
┃ ✦ .spotify
┃ ✦ .twitter
┃ ✦ .mediafire
┃ ✦ .apk
┃ ✦ .sticker
┃ ✦ .take
┃ ✦ .attp
┗━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━〔 👥 GROUP 〕━━━┓
┃ ✦ .tagall
┃ ✦ .hidetag
┃ ✦ .kick
┃ ✦ .add
┃ ✦ .promote
┃ ✦ .demote
┃ ✦ .warn
┃ ✦ .unwarn
┃ ✦ .mute
┃ ✦ .unmute
┃ ✦ .antilink
┃ ✦ .welcome
┃ ✦ .goodbye
┃ ✦ .admins
┃ ✦ .ginfo
┃ ✦ .group open
┃ ✦ .group close
┗━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━〔 😂 FUN 〕━━━┓
┃ ✦ .joke
┃ ✦ .meme
┃ ✦ .quote
┃ ✦ .fact
┃ ✦ .truth
┃ ✦ .dare
┃ ✦ .roast
┃ ✦ .ship
┃ ✦ .flirt
┃ ✦ .simp
┃ ✦ .cute
┃ ✦ .stupid
┃ ✦ .emoji
┃ ✦ .say
┗━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━〔 🛠 TOOLS 〕━━━┓
┃ ✦ .ai
┃ ✦ .gpt
┃ ✦ .tts
┃ ✦ .calc
┃ ✦ .toimg
┃ ✦ .tourl
┃ ✦ .shorturl
┃ ✦ .ssweb
┃ ✦ .trt
┃ ✦ .weather
┃ ✦ .news
┃ ✦ .movie
┃ ✦ .lyrics
┃ ✦ .time
┗━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━〔 🎮 GAMES 〕━━━┓
┃ ✦ .ttt
┃ ✦ .rps
┃ ✦ .guess
┃ ✦ .casino
┃ ✦ .slots
┃ ✦ .quiz
┃ ✦ .math
┃ ✦ .trivia
┃ ✦ .hangman
┃ ✦ .snake
┗━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━〔 👑 OWNER CMDS 〕━━━┓
┃ ✦ .ban
┃ ✦ .unban
┃ ✦ .broadcast
┃ ✦ .setpp
┃ ✦ .setname
┃ ✦ .setbio
┃ ✦ .join
┃ ✦ .leave
┃ ✦ .restart
┃ ✦ .shutdown
┃ ✦ .block
┃ ✦ .unblock
┗━━━━━━━━━━━━━━━━━━━━━━┛

Image: ${IMAGE}`;
    return { success: true, message: menu };
  }
};
