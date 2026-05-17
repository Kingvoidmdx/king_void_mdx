module.exports = {
  name: 'setbio',
  description: 'Set bot about/bio',
  category: 'owner',
  ownerOnly: true,
  execute: async (message, botInstance) => {
    const bio = message.args.join(' ');
    if (!bio) return { message: `*_❌ Usage:_* *_.setbio <bio text>_*` };
    try {
      await botInstance.socket.updateProfileStatus(bio);
      return { message: `*_✅ Bio set to:_* *_${bio}_*` };
    } catch (e) {
      return { message: `*_❌ Failed to set bio:_* *_${e.message}_*` };
    }
  }
};
