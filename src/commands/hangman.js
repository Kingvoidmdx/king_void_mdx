const games = new Map();

const words = ['nodejs', 'whatsapp', 'bot', 'javascript', 'python', 'coding', 'hacker', 'programming', 'server', 'database'];

module.exports = {
  name: 'hangman',
  description: 'Play hangman word guessing game',
  category: 'games',
  execute: async (message, botInstance) => {
    const chat = message.from;
    if (games.has(chat)) return { message: `*_⚠️ A hangman game is already active!_*` };
    const word = words[Math.floor(Math.random() * words.length)];
    const state = { word, guessed: new Set(), attempts: 6 };
    games.set(chat, state);

    const display = word.split('').map(c => state.guessed.has(c) ? c : '⬜').join(' ');
    const hangman = ['😊','😀','🙂','😐','😟','😢','😵'][6 - state.attempts] || '😵';
    return { message: `*_🎮 HANGMAN_*\n\n${hangman}\n\n*_Word:_* *_${display}_*\n*_Attempts left:_* *_${state.attempts}_*\n\n*_Use .hangman guess <letter> to play!_*` };
  }
};

module.exports.getGame = (jid) => games.get(jid);
module.exports.setGame = (jid, g) => games.set(jid, g);
module.exports.deleteGame = (jid) => games.delete(jid);
