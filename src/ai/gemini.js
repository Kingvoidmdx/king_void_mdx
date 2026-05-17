const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEYS = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2
].filter(Boolean);

class GeminiAI {
  constructor() {
    this.currentKeyIndex = 0;
    this.models = {};
    this.conversationMemory = new Map();
    this.initializeModels();
  }

  initializeModels() {
    for (const key of API_KEYS) {
      try {
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        this.models[key] = model;
      } catch (e) {}
    }
  }

  getActiveModel() {
    const key = API_KEYS[this.currentKeyIndex];
    if (!key || !this.models[key]) {
      this.currentKeyIndex = 0;
      const fallbackKey = API_KEYS[0];
      return this.models[fallbackKey] || null;
    }
    return this.models[key];
  }

  switchKey() {
    this.currentKeyIndex = (this.currentKeyIndex + 1) % API_KEYS.length;
  }

  getMemoryKey(jid) {
    return jid.split('@')[0];
  }

  getConversationHistory(jid) {
    const key = this.getMemoryKey(jid);
    if (!this.conversationMemory.has(key)) {
      this.conversationMemory.set(key, []);
    }
    return this.conversationMemory.get(key);
  }

  addToMemory(jid, role, text) {
    const history = this.getConversationHistory(jid);
    history.push({ role, text, timestamp: Date.now() });
    if (history.length > 50) history.shift();
    this.cleanOldMemory(jid);
  }

  cleanOldMemory(jid) {
    const key = this.getMemoryKey(jid);
    const history = this.conversationMemory.get(key) || [];
    const oneHourAgo = Date.now() - 3600000;
    const filtered = history.filter(h => h.timestamp > oneHourAgo);
    this.conversationMemory.set(key, filtered);
  }

  buildContextPrompt(jid, userMessage, ownerOnline, isTagged) {
    const history = this.getConversationHistory(jid);
    const recentHistory = history.slice(-10);

    let context = `You are VOID X 🤖, an intelligent WhatsApp bot assistant owned by Kingvoid_dev77 (2349121419046).
Your responses must ALWAYS be wrapped in italic-bold WhatsApp format like this: *_your response here_*
Keep responses concise, helpful, and professional.

`;

    if (ownerOnline) {
      context += `The owner (Kingvoid_dev77) is currently ONLINE and active.\n`;
    } else {
      context += `The owner (Kingvoid_dev77) is OFFLINE/busy right now.\n`;
    }

    if (isTagged) {
      if (ownerOnline) {
        context += `The owner was tagged in a group. If they ask about accounts/payment, provide escrow details.`;
      } else {
        context += `The owner was tagged but is offline. Inform them the boss isn't available right now.`;
      }
    }

    if (recentHistory.length > 0) {
      context += `\n\nRecent conversation memory:\n`;
      for (const msg of recentHistory) {
        const who = msg.role === 'user' ? 'Them' : 'You';
        context += `${who}: ${msg.text}\n`;
      }
    }

    context += `\n\nThem: ${userMessage}\nYou:`;
    return context;
  }

  async generateResponse(jid, userMessage, ownerOnline = false, isTagged = false) {
    const maxRetries = API_KEYS.length;
    let lastError = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const model = this.getActiveModel();
      if (!model) {
        this.switchKey();
        continue;
      }

      try {
        const prompt = this.buildContextPrompt(jid, userMessage, ownerOnline, isTagged);

        const result = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        });

        const response = result.response.text().trim();

        this.addToMemory(jid, 'user', userMessage);
        this.addToMemory(jid, 'assistant', response);

        const wrapped = response.startsWith('*_') ? response : `*_${response}_*`;
        return wrapped;
      } catch (error) {
        lastError = error;
        this.switchKey();
      }
    }

    return `_*Sorry, I'm having trouble processing that right now. Please try again later.*_`;
  }

  async generateResponseNoMemory(userMessage) {
    const model = this.getActiveModel();
    if (!model) return `_*I'm not available right now.*_`;

    try {
      const prompt = `You are VOID X 🤖, an AI assistant. Respond briefly and helpfully. Always wrap your response in WhatsApp italic-bold format: *_your response_*.\n\nUser: ${userMessage}\nYou:`;
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 300 }
      });
      const response = result.response.text().trim();
      return response.startsWith('*_') ? response : `*_${response}_*`;
    } catch (e) {
      return `_*I encountered an error. Please try again.*_`;
    }
  }
}

module.exports = { GeminiAI };
