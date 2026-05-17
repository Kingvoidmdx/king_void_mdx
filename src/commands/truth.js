const truths = [
  "*_What is the most embarrassing thing you've ever done in public?_*",
  "*_Have you ever lied to your best friend? About what?_*",
  "*_What is your biggest fear in a relationship?_*",
  "*_What is the worst date you've ever been on?_*",
  "*_Have you ever cheated on a test?_*",
];

module.exports = {
  name: 'truth',
  description: 'Get a truth question',
  category: 'fun',
  execute: async () => {
    const t = truths[Math.floor(Math.random() * truths.length)];
    return { success: true, message: `*_🎯 TRUTH_*\n\n${t}` };
  }
};
