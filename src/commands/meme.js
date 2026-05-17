module.exports = {
  name: 'meme',
  description: 'Get a random meme',
  category: 'fun',
  execute: async () => {
    const memes = [
      "*_😂 When the code finally works on the first try!_*",
      "*_🔥 Me explaining to my mom why I need 5 different group chats_*",
      "*_💀 When someone asks 'are you online?' and you were just lurking_*",
    ];
    const meme = memes[Math.floor(Math.random() * memes.length)];
    return { success: true, message: `*_🎭 RANDOM MEME_*\n\n${meme}` };
  }
};
