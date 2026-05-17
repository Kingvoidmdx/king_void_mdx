class EscrowService {
  constructor(socket, aiService, presenceTracker) {
    this.socket = socket;
    this.ai = aiService;
    this.presence = presenceTracker;
    this.ownerJid = process.env.ADMIN_NUMBER + '@s.whatsapp.net';
    this.secondaryNotifyJid = null;
  }

  setSecondaryNotify(jid) {
    this.secondaryNotifyJid = jid;
  }

  getAccountDetails() {
    return `*_🔢Acc num:_* *_9154472946_*

*_👤NAME: DAVID JOSHUA UGIAGBE_*

*_🏦BANK: OPAY BANK 🏦_*`;
  }

  getEscrowPriceList() {
    return `*_ESCROW PRICE LISTED_*
*_BELOW_*

*___________________________________________*

*_1. 1k - 3900 = Free_*
*_2. 4k - 10k = ₦100_*
*_3. 11k - 20k = ₦200_*
*_4. 21k - 50k = ₦300_*
*_5. 31k - 80k = ₦400_*
*_6. 81k - 150k = ₦500_*
*_7. 151k - 250k = ₦800_*
*_8. 300k - 1M = ₦1200_*

*___________________________________________*

*_ADD A SIMPLE DESCRIPTION LIKE "GIFTING" OR "FOOD"...._*

*_"VERY IMPORTANT 🔥"_*

*_NOTE:_*
*_Buyer & seller can agree on splitting escrow fee's_*
*_{Paying half each}_*

*_"if deal gets cancelled half escrow fee will be deducted"_*`;
  }

  getFullEscrowMessage() {
    const details = this.getAccountDetails();
    const priceList = this.getEscrowPriceList();
    return `${details}\n\n${priceList}`;
  }

  async handleEscrowRequest(message, groupJid, requesterJid, requesterName) {
    try {
      await this.socket.sendMessage(groupJid, { text: `*_Okay hold_*` });

      await new Promise(resolve => setTimeout(resolve, 3000));

      const escrowMsg = this.getFullEscrowMessage();
      await this.socket.sendMessage(groupJid, { text: escrowMsg });

      await this.notifyOwner(message, requesterJid, requesterName, groupJid);
    } catch (error) {
      await this.socket.sendMessage(groupJid, { text: `*_Sorry, an error occurred processing your request._*` });
    }
  }

  async notifyOwner(message, requesterJid, requesterName, groupJid) {
    try {
      const notifyJid = this.secondaryNotifyJid || this.ownerJid;
      const groupName = message.key.remoteJid || 'A group';

      const notification = `*_🔔 ESCROW DEAL NOTIFICATION_*

*_From:_* ${requesterName || requesterJid}
*_Group:_* ${groupName}
*_Time:_* ${new Date().toLocaleString()}

*_Account details were shared._*`;

      await this.socket.sendMessage(notifyJid, { text: notification });
    } catch (e) {}
  }

  async handleEscrowCancellation(requesterJid, groupJid) {
    try {
      await this.socket.sendMessage(groupJid, { text: `*_Deal cancelled. Half escrow fee will be deducted._*` });
    } catch (e) {}
  }

  isAccountRequest(text) {
    if (!text) return false;
    const keywords = [
      'drop aza', 'send acc', 'account', 'aza',
      'send account', 'drop account', 'acc number',
      'acc num', 'bank details', 'payment details',
      'escrow', 'i want to pay', 'make payment',
      'where do i pay', 'send payment', 'drop payment'
    ];
    const lower = text.toLowerCase();
    return keywords.some(k => lower.includes(k));
  }
}

module.exports = { EscrowService };
