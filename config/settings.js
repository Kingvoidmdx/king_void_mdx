module.exports = {
  bot: {
    name: 'KING_VOID<>MDX',
    version: '1.0.0',
    author: 'King Val',
    description: 'Multi-platform WhatsApp bot base'
  },
  
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost'
  },

  pairing: {
    qrTimeout: 60000, // 60 seconds
    pushCodeTimeout: 600000, // 10 minutes
    maxPushAttempts: 3
  },

  admin: {
    number: process.env.ADMIN_NUMBER || '',
    fakeSession: process.env.FAKE_SESSION || ''
  },

  database: {
    type: 'json', // 'json' or 'mongodb'
    path: './data'
  },

  features: {
    commands: true,
    groupChat: true,
    autoReply: false,
    webhook: true
  }
};