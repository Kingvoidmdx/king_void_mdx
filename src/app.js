const express = require('express');
const os = require('os');
const config = require('../config/default');

function startApp() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (req, res) => {
    res.status(200).json({
      name: process.env.BOT_NAME || config.botName,
      owner: process.env.OWNER_NAME || config.ownerName,
      status: 'online',
      platform: os.platform(),
      uptime: process.uptime(),
      message: 'Welcome to KING_VOID<>MDX'
    });
  });

  app.get('/health', (req, res) => {
    res.status(200).json({
      ok: true,
      message: 'Server healthy'
    });
  });

  app.get('/menu', (req, res) => {
    res.status(200).json({
      bot: process.env.BOT_NAME || config.botName,
      commands: [
        `${config.prefix}ping`,
        `${config.prefix}menu`
      ]
    });
  });

  app.listen(port, () => {
    console.log(`${process.env.BOT_NAME || config.botName} running on port ${port}`);
  });
}

module.exports = { startApp };
