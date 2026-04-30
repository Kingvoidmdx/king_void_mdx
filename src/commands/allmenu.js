module.exports = {
  name: 'allmenu',
  description: 'Alias for menu',
  category: 'utility',
  execute: async (message, botInstance) => {
    const menuCmd = require('./menu');
    return await menuCmd.execute(message, botInstance);
  }
};
