module.exports = {
  name: 'menu',
  description: 'Show available commands',
  execute() {
    return `
KING_VOID<>MDX MENU

. ping
. menu
    `.trim();
  }
};
