module.exports = {
  name: 'setpp',
  description: 'Set bot profile picture',
  category: 'owner',
  ownerOnly: true,
  execute: async (message, botInstance) => {
    const msg = message.message;
    const img = msg?.imageMessage || msg?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage;
    if (!img) return { message: `*_❌ Reply to an image with .setpp to change profile pic_*` };
    try {
      const buffer = await botInstance.socket.downloadMediaMessage(message.message);
      await botInstance.socket.updateProfilePicture(botInstance.socket.user.id, buffer);
      return { message: `*_🖼️ Profile picture updated successfully!_*` };
    } catch (e) {
      return { message: `*_❌ Failed to set profile pic:_* *_${e.message}_*` };
    }
  }
};
