module.exports = {
  name: 'status',
  description: 'Show bot status',
  category: 'general',
  execute: async (message, botInstance) => {
    const presence = botInstance.presence;
    const status = presence ? presence.getStatus() : { online: false };
    return { success: true, message: `*_🤖 VOID X Status_*

*_Bot:_* *_🟢 ACTIVE_*
*_Owner:_* *_${status.online ? '🟢 Online' : '🔴 Offline'}_*
*_Uptime:_* *_${Math.floor(process.uptime())}s_*` };
  }
};
