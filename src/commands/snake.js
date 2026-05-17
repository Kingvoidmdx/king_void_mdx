module.exports = {
  name: 'snake',
  description: 'Classic snake game (simplified)',
  category: 'games',
  execute: async (message, botInstance) => {
    const grid = 5;
    let snake = [{r:2,c:2}];
    let food = {r: Math.floor(Math.random()*grid), c: Math.floor(Math.random()*grid)};
    let dir = 'R';
    let score = 0;
    const dirs = { R: {r:0,c:1}, L: {r:0,c:-1}, U: {r:-1,c:0}, D: {r:1,c:0} };

    const dirMap = { w:'U', a:'L', s:'D', d:'R', up:'U', left:'L', down:'D', right:'R' };
    const input = (message.args[0]?.toLowerCase() || '');
    const moveDir = dirMap[input];
    if (moveDir && !((moveDir === 'U' && dir === 'D') || (moveDir === 'D' && dir === 'U') || (moveDir === 'L' && dir === 'R') || (moveDir === 'R' && dir === 'L'))) {
      dir = moveDir;
    }

    const d = dirs[dir];
    const head = { r: snake[0].r + d.r, c: snake[0].c + d.c };
    if (head.r < 0 || head.r >= grid || head.c < 0 || head.c >= grid || snake.some(s => s.r === head.r && s.c === head.c)) {
      return { message: `*_🐍 GAME OVER_*\n\n*_Score:_* *_${score}_*\n\n*_Use .snake to play again!_*` };
    }
    snake.unshift(head);
    if (head.r === food.r && head.c === food.c) {
      score++;
      food = {r: Math.floor(Math.random()*grid), c: Math.floor(Math.random()*grid)};
    } else {
      snake.pop();
    }

    let board = '';
    for (let r = 0; r < grid; r++) {
      for (let c = 0; c < grid; c++) {
        if (r === food.r && c === food.c) board += '🍎';
        else if (snake.some(s => s.r === r && s.c === c)) board += '🟩';
        else board += '⬜';
      }
      board += '\n';
    }

    return { message: `*_🐍 SNAKE_*\n\n${board}\n*_Score:_* *_${score}_*\n*_Controls:_* *_.snake w/a/s/d_*` };
  }
};
