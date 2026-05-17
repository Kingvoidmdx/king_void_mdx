const hangman = require('./hangman');

module.exports = {
  name: 'hangmanguess',
  description: 'Guess a letter in hangman',
  category: 'games',
  execute: async (message, botInstance) => {
    const letter = message.args[0]?.toLowerCase();
    if (!letter || letter.length !== 1) return { message: `*_❌ Usage:_* *_.hangman guess <letter>_*` };

    const state = hangman.getGame(message.from);
    if (!state) return { message: `*_❌ No active hangman game. Start one with .hangman_*` };

    if (state.guessed.has(letter)) return { message: `*_⚠️ Letter "${letter}" already guessed!_*` };
    state.guessed.add(letter);

    if (!state.word.includes(letter)) state.attempts--;

    const display = state.word.split('').map(c => state.guessed.has(c) ? c : '⬜').join(' ');
    const hangmanFaces = ['😊','😀','🙂','😐','😟','😢','😵'];
    const face = hangmanFaces[6 - state.attempts] || '😵';

    if (state.attempts <= 0) {
      hangman.deleteGame(message.from);
      return { message: `*_🎮 HANGMAN_*\n\n😵\n\n*_Game Over!_* *_The word was:_* *_${state.word}_*` };
    }

    if (!display.includes('⬜')) {
      hangman.deleteGame(message.from);
      return { message: `*_🎮 HANGMAN_*\n\n${face}\n\n*_Word:_* *_${display}_*\n*_🎉 You won! The word was:_* *_${state.word}_*` };
    }

    hangman.setGame(message.from, state);
    return { message: `*_🎮 HANGMAN_*\n\n${face}\n\n*_Word:_* *_${display}_*\n*_Attempts left:_* *_${state.attempts}_*\n*_Guessed:_* *_${[...state.guessed].join(', ')}_*` };
  }
};
