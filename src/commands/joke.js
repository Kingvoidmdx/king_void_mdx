const jokes = [
  "*_Why don't scientists trust atoms? Because they make up everything!_*",
  "*_Why did the scarecrow win an award? He was outstanding in his field!_*",
  "*_I told my wife she was drawing her eyebrows too high. She looked surprised._*",
  "*_What do you call a fake noodle? An impasta!_*",
  "*_How does a penguin build its house? Igloos it together!_*",
];

let idx = 0;

module.exports = {
  name: 'joke',
  description: 'Get a random joke',
  category: 'fun',
  execute: async () => {
    const joke = jokes[idx % jokes.length];
    idx++;
    return { success: true, message: joke };
  }
};
