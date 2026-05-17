const flirts = [
  "*_Are you a magician? Because whenever I look at you, everyone else disappears._*",
  "*_Do you have a map? I keep getting lost in your eyes._*",
  "*_Is your name Google? Because you have everything I'm searching for._*",
  "*_Are you a time traveler? Because I see you in my future._*",
  "*_Do you believe in love at first sight, or should I walk by again?_*",
];

module.exports = {
  name: 'flirt',
  description: 'Get a flirty pickup line',
  category: 'fun',
  execute: async (message) => {
    const f = flirts[Math.floor(Math.random() * flirts.length)];
    const target = message.args[0] || '';
    const prefix = target ? `*_💘 Flirt for ${target}_*\n\n` : '';
    return { success: true, message: `${prefix}${f}` };
  }
};
