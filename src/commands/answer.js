const quiz = require('./quiz');
const math = require('./math');
const trivia = require('./trivia');
const guess = require('./guess');

module.exports = {
  name: 'answer',
  description: 'Answer a quiz/math/trivia/guess question',
  category: 'games',
  execute: async (message, botInstance) => {
    const userAnswer = message.args.join(' ').toLowerCase().trim();
    if (!userAnswer) return { message: `*_❌ Usage:_* *_.answer <your answer>_*` };

    const chat = message.from;

    const qGame = quiz.getGame(chat);
    if (qGame && qGame.type === 'quiz') {
      quiz.deleteGame(chat);
      if (userAnswer === qGame.answer.toLowerCase()) return { message: `*_🎉 Correct! Well done!_*` };
      return { message: `*_❌ Wrong! The answer was:_* *_${qGame.answer}_*` };
    }

    const mGame = math.getGame(chat);
    if (mGame && mGame.type === 'math') {
      math.deleteGame(chat);
      if (userAnswer === mGame.answer) return { message: `*_🎉 Correct!_*` };
      return { message: `*_❌ Wrong! The answer was:_* *_${mGame.answer}_*` };
    }

    const tGame = trivia.getGame(chat);
    if (tGame && tGame.type === 'trivia') {
      trivia.deleteGame(chat);
      if (userAnswer === tGame.answer) return { message: `*_🎉 Correct!_*` };
      return { message: `*_❌ Wrong!_*` };
    }

    const gGame = guess.getGame(chat);
    if (gGame) {
      gGame.attempts++;
      if (userAnswer === String(gGame.number)) {
        guess.deleteGame(chat);
        return { message: `*_🎉 Correct! The number was:_* *_${gGame.number}_*\n*_Attempts:_* *_${gGame.attempts}_*` };
      }
      const hint = userAnswer < gGame.number ? 'higher' : 'lower';
      if (gGame.attempts >= 5) {
        guess.deleteGame(chat);
        return { message: `*_😢 Game Over! The number was:_* *_${gGame.number}_*` };
      }
      guess.setGame(chat, gGame);
      return { message: `*_❌ Wrong! Try ${hint}. Attempts: ${gGame.attempts}/5_*` };
    }

    return { message: `*_❌ No active question. Use .quiz, .math, .trivia, or .guess to start!_*` };
  }
};
