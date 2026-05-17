module.exports = {
  name: 'setname',
  description: 'Set bot name',
  category: 'owner',
  ownerOnly: true,
  execute: async (message) => {
    const name = message.args.join(' ');
    if (!name) return { message: `*_❌ Usage:_* *_.setname <new name>_*` };
    process.env.BOT_NAME = name;
    return { message: `*_✅ Bot name changed to:_* *_${name}_*\n\n*_⚠️ Changes may take a few minutes to reflect_*` };
  }
};
