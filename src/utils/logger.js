const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(process.cwd(), 'bot.log');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const logger = {
  info: (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [INFO] ${message}`;
    console.log(`${colors.cyan}${logMessage}${colors.reset}`);
    fs.appendFileSync(LOG_FILE, logMessage + '\n');
  },

  error: (message, error = '') => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [ERROR] ${message} ${error ? error : ''}`;
    console.error(`${colors.red}${logMessage}${colors.reset}`);
    fs.appendFileSync(LOG_FILE, logMessage + '\n');
  },

  warn: (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [WARN] ${message}`;
    console.warn(`${colors.yellow}${logMessage}${colors.reset}`);
    fs.appendFileSync(LOG_FILE, logMessage + '\n');
  },

  success: (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [SUCCESS] ${message}`;
    console.log(`${colors.green}${logMessage}${colors.reset}`);
    fs.appendFileSync(LOG_FILE, logMessage + '\n');
  }
};

module.exports = { logger };