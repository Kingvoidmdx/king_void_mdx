const games = new Map();

module.exports = {
  name: 'math',
  description: 'Solve a math problem',
  category: 'games',
  execute: async (message, botInstance) => {
    const a = Math.floor(Math.random() * 50) + 1;
    const b = Math.floor(Math.random() * 50) + 1;
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let ans;
    switch(op) { case '+': ans = a + b; break; case '-': ans = a - b; break; case '*': ans = a * b; break; }
    games.set(message.from, { answer: String(ans), type: 'math' });
    return { message: `*_🔢 MATH CHALLENGE_*\n\n*_${a} ${op} ${b} = ?_*\n\n*_Use .answer <number> to answer!_*` };
  }
};

module.exports.getGame = (jid) => games.get(jid);
module.exports.deleteGame = (jid) => games.delete(jid);
