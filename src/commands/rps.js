module.exports = {
  name: 'rps',
  description: 'Play Rock-Paper-Scissors',
  category: 'games',
  execute: async (message) => {
    const choice = message.args[0]?.toLowerCase();
    const valid = ['rock', 'paper', 'scissors'];
    if (!choice || !valid.includes(choice)) {
      return { success: true, message: `*_❌ Usage:_* *_.rps rock/paper/scissors_*` };
    }
    const bot = valid[Math.floor(Math.random() * 3)];
    const win = (choice === 'rock' && bot === 'scissors') ||
                (choice === 'paper' && bot === 'rock') ||
                (choice === 'scissors' && bot === 'paper');
    const result = win ? '🎉 You Win!' : (choice === bot ? '🤝 Draw!' : '😢 You Lose!');
    return { success: true, message: `*_✊🖐✌️ RPS_*

*_You:_* *_${choice}_*
*_Bot:_* *_${bot}_*
*_Result:_* *_${result}_*` };
  }
};
