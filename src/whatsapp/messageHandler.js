const { logger } = require('../utils/logger');
const { getCommandPrefix, setCommandPrefix } = require('../database/prefixManager');

class MessageHandler {
  constructor(socket, commands) {
    this.socket = socket;
    this.commands = commands;
    this.socket.ev.on('message.new', this.handleMessage.bind(this));
  }

  /**
   * Handle incoming messages
   */
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
      }

      if (!text) return;

      logger.info(`📨 Message from ${from}: ${text}`);

      // Get command prefix for user
      const prefix = await getCommandPrefix(from) || '.';

      // Check if message starts with prefix
      if (!text.startsWith(prefix)) return;

      // Extract command and args
      const args = text.slice(prefix.length).trim().split(/\s+/);
      const commandName = args.shift().toLowerCase();

      logger.info(`🔍 Command: ${commandName} | Args: ${args.join(', ')}`);

      // Find command
      const command = this.commands.find(cmd => cmd.name === commandName);

      if (!command) {
        await this.socket.sendMessage(from, {
          text: `❌ Command not found: ${commandName}\n\nUse "${prefix}help" to see available commands`
        });
        return;
      }

      // Execute command
      const result = await command.execute(
        { text, from, args, message },
        { socket: this.socket, commands: this.commands }
      );

      if (result.success && result.message) {
        await this.socket.sendMessage(from, { text: result.message });
      } else if (!result.success && result.error) {
        await this.socket.sendMessage(from, { text: `❌ Error: ${result.error}` });
      }
    } catch (error) {
      logger.error('❌ Message handler error:', error.message);
    }
  }
}

module.exports = { MessageHandler };
