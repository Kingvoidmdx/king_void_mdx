const games = new Map();

module.exports = {
  name: 'guess',
  description: 'Guess the number game',
  category: 'games',
  execute: async (message, botInstance) => {
    const chat = message.from;
    if (games.has(chat)) return { message: `*_⚠️ A guess game is already active! Use .guess <number>_*` };
    const number = Math.floor(Math.random() * 10) + 1;
    games.set(chat, { number, attempts: 0 });
    return { message: `*_🎯 GUESS THE NUMBER_*\n\n*_I'm thinking of a number between 1-10_*\n*_Use .guess <number> to play!_*` };
  }
};

module.exports.getGame = (jid) => games.get(jid);
module.exports.setGame = (jid, g) => games.set(jid, g);
module.exports.deleteGame = (jid) => games.delete(jid);
