const games = new Map();

const quizzes = [
  { q: "What is the capital of France?", a: "Paris" },
  { q: "Which planet is known as the Red Planet?", a: "Mars" },
  { q: "What is 2 + 2?", a: "4" },
  { q: "Who wrote Romeo and Juliet?", a: "Shakespeare" },
  { q: "What is the largest ocean?", a: "Pacific" },
  { q: "What is the smallest country in the world?", a: "Vatican" },
  { q: "Which animal is known as the King of the Jungle?", a: "Lion" },
  { q: "What color are bananas?", a: "Yellow" },
];

module.exports = {
  name: 'quiz',
  description: 'Answer a quiz question',
  category: 'games',
  execute: async (message, botInstance) => {
    const q = quizzes[Math.floor(Math.random() * quizzes.length)];
    games.set(message.from, { answer: q.a.toLowerCase(), type: 'quiz' });
    return { message: `*_🧠 QUIZ_*\n\n*_Q: ${q.q}_*\n\n*_Use .answer <your answer> to respond!_*` };
  }
};

module.exports.getGame = (jid) => games.get(jid);
module.exports.deleteGame = (jid) => games.delete(jid);
