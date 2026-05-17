const games = new Map();

module.exports = {
  name: 'casino',
  description: 'Play casino dice game',
  category: 'games',
  execute: async (message, botInstance) => {
    const bet = parseInt(message.args[0]) || 100;
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const total = dice1 + dice2;
    let result, payout;
    if (total <= 6) { result = 'Low'; payout = Math.floor(bet * 0.5); }
    else if (total <= 9) { result = 'Mid'; payout = Math.floor(bet * 1.5); }
    else { result = 'High'; payout = Math.floor(bet * 2.5); }
    const win = total > 7;
    await botInstance.socket.sendMessage(message.from, {
      text: `*_🎰 CASINO_*\n\n*_🎲 Dice:_* *_${dice1}_* *_&_* *_${dice2}_*\n*_Total:_* *_${total}_*\n*_Result:_* *_${result}_*\n*_💰 Bet:_* *_₦${bet}_*\n*_${win ? '🎉 You won ₦' + payout + '!' : '😢 You lost ₦' + bet + '!'}_*`
    });
    return { handled: true };
  }
};
