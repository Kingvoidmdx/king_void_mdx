module.exports = {
  name: 'broadcast',
  description: 'Broadcast message to all chats',
  category: 'owner',
  ownerOnly: true,
  execute: async (message, botInstance) => {
    const msg = message.args.join(' ');
    if (!msg) return { message: `*_❌ Usage:_* *_.broadcast <message>_*` };
    try {
      let sent = 0;
      for (const [jid] of botInstance.socket.chats || []) {
        if (jid.includes('@g.us') || jid.includes('@s.whatsapp.net')) {
          await botInstance.socket.sendMessage(jid, { text: `*_📢 BROADCAST_*\n\n${msg}\n\n*_From Kingvoid_dev77_*` });
          sent++;
        }
      }
      return { message: `*_📢 Broadcast sent to ${sent} chats_*` };
    } catch (e) {
      return { message: `*_❌ Broadcast failed:_* *_${e.message}_*` };
    }
  }
};
