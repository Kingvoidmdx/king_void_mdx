module.exports = {
  name: 'restart',
  description: 'Restart the bot',
  category: 'owner',
  ownerOnly: true,
  execute: async (message, botInstance) => {
    await botInstance.socket.sendMessage(message.from, { text: `*_🔄 Restarting VOID X..._*` });
    process.on('exit', () => { require('child_process').spawn(process.argv[1], process.argv.slice(2), { stdio: 'inherit' }).unref(); });
    process.exit(0);
  }
};
