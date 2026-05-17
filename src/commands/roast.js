const roasts = [
  "*_You're not stupid; you just have bad luck with thinking._*",
  "*_I'd agree with you, but then we'd both be wrong._*",
  "*_You bring everyone so much joy when you leave the room._*",
  "*_Somewhere a village is missing its idiot._*",
  "*_If I wanted to hear from an idiot, I'd watch your livestream._*",
];

module.exports = {
  name: 'roast',
  description: 'Get a random roast',
  category: 'fun',
  execute: async (message) => {
    const target = message.args[0] || 'Someone';
    const r = roasts[Math.floor(Math.random() * roasts.length)];
    return { success: true, message: `*_🔥 ROAST for ${target}_*\n\n${r}` };
  }
};
