class PresenceTracker {
  constructor(socket) {
    this.socket = socket;
    this.ownerJid = process.env.ADMIN_NUMBER + '@s.whatsapp.net';
    this.isOwnerOnline = false;
    this.lastPresenceUpdate = 0;
    this.presenceTimers = new Map();
    this.presenceData = new Map();
    this.startPresenceMonitoring();
  }

  startPresenceMonitoring() {
    if (!this.socket) return;

    this.socket.ev.on('presence.update', (update) => {
      try {
        const { id, presences } = update;
        if (!id || !presences) return;

        for (const [jid, presence] of Object.entries(presences)) {
          const cleanJid = jid.replace(/:.*$/, '');
          if (cleanJid === this.ownerJid) {
            const lastKnownPresence = presence.lastKnownPresence;
            if (lastKnownPresence === 'available' || lastKnownPresence === 'composing') {
              this.isOwnerOnline = true;
              this.lastPresenceUpdate = Date.now();
            } else if (lastKnownPresence === 'unavailable') {
              this.isOwnerOnline = false;
              this.lastPresenceUpdate = Date.now();
            }
          }
        }
      } catch (e) {}
    });
  }

  async subscribeToOwnerPresence() {
    try {
      if (this.socket) {
        await this.socket.presenceSubscribe(this.ownerJid);
      }
    } catch (e) {}
  }

  checkOnlineStatus() {
    const fiveMinutes = 5 * 60 * 1000;
    if (Date.now() - this.lastPresenceUpdate > fiveMinutes) {
      this.isOwnerOnline = false;
    }
    return this.isOwnerOnline;
  }

  getStatus() {
    return {
      online: this.checkOnlineStatus(),
      lastUpdate: this.lastPresenceUpdate,
      ownerJid: this.ownerJid
    };
  }

  getOwnerJid() {
    return this.ownerJid;
  }

  isOwnerTagged(message) {
    try {
      if (!message.message) return false;

      const msg = message.message;
      let text = '';

      if (msg.conversation) text = msg.conversation;
      else if (msg.extendedTextMessage) text = msg.extendedTextMessage.text;
      else if (msg.imageMessage?.caption) text = msg.imageMessage.caption;

      if (!text) return false;

      const ownerMentions = [
        this.ownerJid,
        process.env.ADMIN_NUMBER,
        process.env.OWNER_NAME || 'Kingvoid_dev77',
        '2349121419046'
      ];

      const mentionedJid = message.message.extendedTextMessage?.contextInfo?.mentionedJid || [];

      for (const mention of mentionedJid) {
        const cleanMention = mention.replace(/:.*$/, '');
        if (cleanMention === this.ownerJid) return true;
      }

      for (const ownerRef of ownerMentions) {
        if (text.toLowerCase().includes(ownerRef.toLowerCase())) return true;
        if (text.includes(`@${ownerRef}`)) return true;
      }

      return false;
    } catch (e) {
      return false;
    }
  }

  isGroupMessage(message) {
    return message.key.remoteJid?.includes('@g.us');
  }

  isDM(message) {
    return !this.isGroupMessage(message);
  }
}

module.exports = { PresenceTracker };
