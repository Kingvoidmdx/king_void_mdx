const slotIcons = ['🍒', '🍋', '🍊', '🍇', '💎', '7️⃣', '🔔', '⭐'];

module.exports = {
  name: 'slots',
  description: 'Play slot machine',
  category: 'games',
  execute: async () => {
    const spin = () => slotIcons[Math.floor(Math.random() * slotIcons.length)];
    const r1 = spin(), r2 = spin(), r3 = spin();
    const win = r1 === r2 && r2 === r3;
    const partial = r1 === r2 || r2 === r3 || r1 === r3;
    let result = win ? '🎉 JACKPOT!' : partial ? '🤏 Close!' : '😢 Try again!';
    return { success: true, message: `*_🎰 SLOTS_*

*_${r1} | ${r2} | ${r3}_*

*_${result}_*` };
  }
};
