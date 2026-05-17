module.exports = {
  name: 'stupid',
  description: 'Check how stupid you are',
  category: 'fun',
  execute: async (message) => {
    const target = message.args[0] || message.from?.split('@')[0] || 'You';
    const level = Math.floor(Math.random() * 101);
    return { success: true, message: `*_🧠 STUPIDITY CHECK_*

*_${target}:_* *_${level}% stupid_* 🤪` };
  }
};
