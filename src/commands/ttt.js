const games = new Map();

module.exports = {
  name: 'ttt',
  description: 'Play Tic-Tac-Toe with a friend',
  category: 'games',
  execute: async (message, botInstance) => {
    if (!message.from.endsWith('@g.us')) return { message: `*_❌ Play in a group with @opponent_*` };
    const opp = message.args[0];
    if (!opp) return { message: `*_❌ Usage:_* *_.ttt @opponent_*` };
    const oppJid = opp.includes('@') ? opp : `${opp}@s.whatsapp.net`;
    const sender = message.message.key?.participant || message.from;
    if (games.has(message.from)) return { message: `*_⚠️ A game is already ongoing in this group_*` };

    const board = [['⬜','⬜','⬜'],['⬜','⬜','⬜'],['⬜','⬜','⬜']];
    const game = { board, turn: sender, players: [sender, oppJid], moves: 0 };
    games.set(message.from, game);

    const render = (b) => b.map(r => r.join(' ')).join('\n');
    await botInstance.socket.sendMessage(message.from, {
      text: `*_🎮 TIC-TAC-TOE_*\n${render(board)}\n\n*_${sender.split('@')[0]} (X) vs ${oppJid.split('@')[0]} (O)_*\n*_Your turn:_* @${sender.split('@')[0]}\n*_Use:_* *_.tttplay <1-9>_*`,
      mentions: [sender, oppJid]
    });
    return { handled: true };
  }
};

// Helper game state
module.exports.getGame = (jid) => games.get(jid);
module.exports.setGame = (jid, g) => games.set(jid, g);
module.exports.deleteGame = (jid) => games.delete(jid);
