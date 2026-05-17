module.exports = {
  name: 'shutdown',
  description: 'Shutdown the bot',
  category: 'owner',
  ownerOnly: true,
  execute: async (message, botInstance) => {
    await botInstance.socket.sendMessage(message.from, { text: `*_👋 Shutting down VOID X... Goodbye!_*` });
    setTimeout(() => process.exit(0), 1000);
  }
};
