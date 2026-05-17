const games = new Map();

const trivia = [
  { q: "What year was WhatsApp launched?", a: "b", options: "A) 2007  B) 2009  C) 2011  D) 2013" },
  { q: "Which language is used for web structure?", a: "a", options: "A) HTML  B) CSS  C) JS  D) Python" },
  { q: "Who is the CEO of Tesla?", a: "c", options: "A) Jeff Bezos  B) Mark  C) Elon Musk  D) Bill Gates" },
  { q: "What does CPU stand for?", a: "d", options: "A) Central  B) Core  C) Computer  D) Central Processing Unit" },
];

module.exports = {
  name: 'trivia',
  description: 'Get a trivia question',
  category: 'games',
  execute: async (message, botInstance) => {
    const t = trivia[Math.floor(Math.random() * trivia.length)];
    games.set(message.from, { answer: t.a, type: 'trivia' });
    return { message: `*_🧠 TRIVIA_*\n\n*_${t.q}_*\n\n*_${t.options}_*\n\n*_Use .answer <letter> to respond_*` };
  }
};

module.exports.getGame = (jid) => games.get(jid);
module.exports.deleteGame = (jid) => games.delete(jid);
