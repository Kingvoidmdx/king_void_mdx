const fs = require('fs').promises;
const path = require('path');
const { logger } = require('../utils/logger');

const DATA_DIR = './data';
const PREFIX_FILE = path.join(DATA_DIR, 'prefixes.json');

const DEFAULT_PREFIX = '.';

/**
 * Ensure data directory exists
 */
const ensureDataDir = async () => {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    logger.error('❌ Failed to create data directory:', error.message);
  }
};

/**
 * Load all user prefixes
 */
const loadPrefixes = async () => {
  try {
    await ensureDataDir();
    const data = await fs.readFile(PREFIX_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {};
    }
    logger.warn('⚠️  Failed to load prefixes:', error.message);
    return {};
  }
};

/**
 * Save all prefixes
 */
const savePrefixes = async (prefixes) => {
  try {
    await ensureDataDir();
    await fs.writeFile(PREFIX_FILE, JSON.stringify(prefixes, null, 2));
  } catch (error) {
    logger.error('❌ Failed to save prefixes:', error.message);
  }
};

/**
 * Get command prefix for a user (JID)
 */
const getCommandPrefix = async (jid) => {
  try {
    const prefixes = await loadPrefixes();
    return prefixes[jid] || DEFAULT_PREFIX;
  } catch (error) {
    logger.error('❌ Failed to get prefix:', error.message);
    return DEFAULT_PREFIX;
  }
};

/**
 * Set command prefix for a user (JID)
 */
const setCommandPrefix = async (jid, newPrefix) => {
  try {
    // Validate prefix (single character)
    if (newPrefix.length !== 1) {
      return {
        success: false,
        error: 'Prefix must be a single character'
      };
    }

    const prefixes = await loadPrefixes();
    prefixes[jid] = newPrefix;
    await savePrefixes(prefixes);

    logger.info(`✅ Prefix changed for ${jid}: ${newPrefix}`);
    
    return {
      success: true,
      message: `✅ Command prefix changed to: ${newPrefix}`
    };
  } catch (error) {
    logger.error('❌ Failed to set prefix:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = {
  getCommandPrefix,
  setCommandPrefix,
  loadPrefixes,
  savePrefixes,
  DEFAULT_PREFIX
};
