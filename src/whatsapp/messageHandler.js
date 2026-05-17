const { logger } = require('../utils/logger');
const { getCommandPrefix } = require('../database/prefixManager');
const { GeminiAI } = require('../ai/gemini');
const { PresenceTracker } = require('../services/presence');
const { EscrowService } = require('../services/escrow');

class MessageHandler {
  constructor(socket, commands) {
    this.socket = socket;
    this.commands = commands;
    this.ai = new GeminiAI();
    this.presence = new PresenceTracker(socket);
    this.escrow = new EscrowService(socket, this.ai, this.presence);
    this.presence.subscribeToOwnerPresence();

    this.socket.ev.on('messages.upsert', this.onMessagesUpsert.bind(this));
    logger.success('✅ Message handler initialized with AI, Presence & Escrow');
  }

  async onMessagesUpsert({ messages, type }) {
    for (const msg of messages) {
      if (!msg.message || msg.key.fromMe) continue;
      if (msg.key.remoteJid === 'status@broadcast') continue;
      await this.handleMessage(msg);
    }
  }

  async handleMessage(message) {
    try {
      const from = message.key.remoteJid;
      const messageType = Object.keys(message.message)[0];
      const messageContent = message.message[messageType];

      let text = '';
      if (messageType === 'conversation') {
        text = messageContent;
      } else if (messageType === 'extendedTextMessage') {
        text = messageContent.text;
      } else if (messageType === 'imageMessage') {
        text = messageContent.caption || '';
      }

      if (!text && messageType !== 'imageMessage') return;

      const isGroup = this.presence.isGroupMessage(message);
      const isDM = this.presence.isDM(message);
      const ownerOnline = this.presence.checkOnlineStatus();
      const isOwnerTagged = this.presence.isOwnerTagged(message);

      logger.info(`📨 [${isGroup ? 'GROUP' : 'DM'}] from ${from}: ${text.substring(0, 50)}`);

      const prefix = await getCommandPrefix(from.split('@')[0]) || '.';

      if (text.startsWith(prefix)) {
        await this.handleCommand(text, prefix, from, message);
        return;
      }

      if (isGroup) {
        if (isOwnerTagged) {
          if (ownerOnline) {
            if (this.escrow.isAccountRequest(text)) {
              const sender = message.key.participant || from;
              const senderName = message.pushName || 'Someone';
              await this.escrow.handleEscrowRequest(message, from, sender, senderName);
              return;
            }
          } else {
            const aiReply = await this.ai.generateResponse(from, text, ownerOnline, true);
            await this.socket.sendMessage(from, { text: aiReply });
            return;
          }
        }
        return;
      }

      if (isDM) {
        const aiReply = await this.ai.generateResponse(from, text, ownerOnline, false);
        await this.socket.sendMessage(from, { text: aiReply });
      }
    } catch (error) {
      logger.error('❌ Message handler error:', error.message);
    }
  }

  async handleCommand(text, prefix, from, message) {
    try {
      const args = text.slice(prefix.length).trim().split(/\s+/);
      const commandName = args.shift().toLowerCase();

      const command = this.commands.find(cmd => cmd.name === commandName);
      if (!command) return;

      const result = await command.execute(
        { text, from, args, message, prefix },
        {
          socket: this.socket,
          commands: this.commands,
          ai: this.ai,
          presence: this.presence,
          escrow: this.escrow
        }
      );

      if (result) {
        if (result.handled) return;
        if (result.message) {
          await this.socket.sendMessage(from, { text: result.message });
        }
      }
    } catch (error) {
      logger.error('❌ Command handler error:', error.message);
    }
  }
}

module.exports = { MessageHandler };
