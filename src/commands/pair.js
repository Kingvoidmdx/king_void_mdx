module.exports = {
  name: 'pair',
  description: 'Start pairing (alias)',
  category: 'utility',
  execute: async (message, botInstance) => {
    // delegate to pairing system if available
    if (botInstance && botInstance.pairingPrompt) {
      const res = await botInstance.pairingPrompt.startPairing(botInstance.waConnection);
      return { success: true, message: `Pairing result: ${res ? JSON.stringify(res) : 'failed'}` };
    }
    return { success: false, message: 'Pairing system not available in this environment.' };
  }
};
