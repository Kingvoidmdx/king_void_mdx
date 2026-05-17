const dares = [
  "*_Send the last emoji you used to the group chat_*",
  "*_Change your profile picture to something silly for 10 minutes_*",
  "*_Say 'I love this group' in the most dramatic way possible_*",
  "*_Send a voice note singing your favorite song_*",
  "*_Type with your eyes closed for the next 2 messages_*",
];

module.exports = {
  name: 'dare',
  description: 'Get a dare challenge',
  category: 'fun',
  execute: async () => {
    const d = dares[Math.floor(Math.random() * dares.length)];
    return { success: true, message: `*_🔥 DARE_*\n\n${d}` };
  }
};
