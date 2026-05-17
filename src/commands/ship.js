module.exports = {
  name: 'ship',
  description: 'Ship two people together',
  category: 'fun',
  execute: async (message) => {
    const names = message.args.join(' ').split(/[&,+]/).map(n => n.trim());
    if (names.length < 2) {
      return { success: true, message: `*_❌ Usage:_* *_.ship name1 & name2_*` };
    }
    const love = Math.floor(Math.random() * 101);
    const shipName = names[0].slice(0, 3) + names[1].slice(-3);
    return { success: true, message: `*_💕 SHIP TEST_*

*_${names[0]} 💘 ${names[1]}_*

*_Ship Name:_* *_${shipName}_*
*_Love Rate:_* *_${love}%_*` };
  }
};
