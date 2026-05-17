module.exports = {
  name: 'simp',
  description: 'Check your simp level',
  category: 'fun',
  execute: async (message) => {
    const target = message.args[0] || message.from?.split('@')[0] || 'You';
    const level = Math.floor(Math.random() * 101);
    const label = level < 30 ? 'Not a simp 😎' : level < 60 ? 'Average simp 🤨' : level < 80 ? 'High simp 🫣' : 'Ultimate simp 👑';
    return { success: true, message: `*_🫡 SIMP CHECK_*

*_${target}:_* *_${level}% simp_*
*_Status:_* *_${label}_*` };
  }
};
