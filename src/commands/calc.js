module.exports = {
  name: 'calc',
  description: 'Calculate a math expression',
  category: 'tools',
  execute: async (message) => {
    const expr = message.args.join(' ');
    if (!expr) return { success: true, message: `*_❌ Usage:_* *_.calc <expression>_*` };
    try {
      const result = Function(`'use strict'; return (${expr})`)();
      return { success: true, message: `*_🧮 CALCULATOR_*

*_${expr}_* *_=_* *_${result}_*` };
    } catch {
      return { success: true, message: `*_❌ Invalid expression_*` };
    }
  }
};
