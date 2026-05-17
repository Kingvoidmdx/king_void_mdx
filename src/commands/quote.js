const quotes = [
  "*_The only way to do great work is to love what you do. - Steve Jobs_*",
  "*_In the middle of difficulty lies opportunity. - Albert Einstein_*",
  "*_Success is not final, failure is not fatal._*",
  "*_Believe you can and you're halfway there. - Theodore Roosevelt_*",
  "*_It does not matter how slowly you go as long as you do not stop. - Confucius_*",
];

module.exports = {
  name: 'quote',
  description: 'Get a random quote',
  category: 'fun',
  execute: async () => {
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    return { success: true, message: `*_💡 INSPIRATIONAL QUOTE_*\n\n${q}` };
  }
};
