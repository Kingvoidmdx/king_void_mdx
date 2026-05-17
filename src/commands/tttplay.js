const ttt = require('./ttt');

module.exports = {
  name: 'tttplay',
  description: 'Make a move in Tic-Tac-Toe (1-9)',
  category: 'games',
  execute: async (message, botInstance) => {
    const pos = parseInt(message.args[0]);
    if (isNaN(pos) || pos < 1 || pos > 9) return { message: `*_❌ Usage:_* *_.tttplay <1-9>_*` };

    const game = ttt.getGame(message.from);
    if (!game) return { message: `*_❌ No active Tic-Tac-Toe game. Start one with .ttt @opponent_*` };

    const sender = message.message.key?.participant || message.from;
    if (sender !== game.turn) return { message: `*_⏳ Not your turn!_*` };

    const idx = pos - 1;
    const r = Math.floor(idx / 3);
    const c = idx % 3;
    if (game.board[r][c] !== '⬜') return { message: `*_❌ That position is already taken!_*` };

    const symbol = game.players[0] === sender ? '❌' : '⭕';
    game.board[r][c] = symbol;
    game.moves++;

    const winPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    const flat = game.board.flat();
    let winner = null;
    for (const p of winPatterns) {
      if (flat[p[0]] !== '⬜' && flat[p[0]] === flat[p[1]] && flat[p[1]] === flat[p[2]]) {
        winner = sender;
        break;
      }
    }

    const render = (b) => b.map(r => r.join(' ')).join('\n');

    if (winner) {
      ttt.deleteGame(message.from);
      await botInstance.socket.sendMessage(message.from, {
        text: `*_🎮 TIC-TAC-TOE_*\n${render(game.board)}\n\n*_🎉 Winner:_* @${winner.split('@')[0]}`,
        mentions: game.players
      });
      return { handled: true };
    }
    if (game.moves >= 9) {
      ttt.deleteGame(message.from);
      await botInstance.socket.sendMessage(message.from, {
        text: `*_🎮 TIC-TAC-TOE_*\n${render(game.board)}\n\n*_🤝 It's a draw!_*`,
        mentions: game.players
      });
      return { handled: true };
    }

    game.turn = game.players.find(p => p !== sender);
    ttt.setGame(message.from, game);
    await botInstance.socket.sendMessage(message.from, {
      text: `*_🎮 TIC-TAC-TOE_*\n${render(game.board)}\n\n*_Your turn:_* @${game.turn.split('@')[0]}\n*_Use:_* *_.tttplay <1-9>_*`,
      mentions: game.players
    });
    return { handled: true };
  }
};
