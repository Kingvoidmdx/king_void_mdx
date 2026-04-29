const fs = require('fs').promises;
const path = require('path');
const { logger } = require('../utils/logger');

const DATA_DIR = './data';
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');

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
 * Load all sessions
 */
const loadSessions = async () => {
  try {
    await ensureDataDir();
    const data = await fs.readFile(SESSIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {};
    }
    logger.warn('⚠️  Failed to load sessions:', error.message);
    return {};
  }
};

/**
 * Save all sessions
 */
const saveSessions = async (sessions) => {
  try {
    await ensureDataDir();
    await fs.writeFile(SESSIONS_FILE, JSON.stringify(sessions, null, 2));
  } catch (error) {
    logger.error('❌ Failed to save sessions:', error.message);
  }
};

/**
 * Save a single session
 */
const saveSession = async (sessionId, sessionData) => {
  try {
    const sessions = await loadSessions();
    sessions[sessionId] = {
      ...sessionData,
      lastSaved: new Date().toISOString()
    };
    await saveSessions(sessions);
    logger.info(`✅ Session saved: ${sessionId}`);
  } catch (error) {
    logger.error('❌ Failed to save session:', error.message);
  }
};

/**
 * Get a session
 */
const getSession = async (sessionId) => {
  try {
    const sessions = await loadSessions();
    return sessions[sessionId] || null;
  } catch (error) {
    logger.error('❌ Failed to get session:', error.message);
    return null;
  }
};

/**
 * Get all sessions
 */
const getAllSessions = async () => {
  try {
    return await loadSessions();
  } catch (error) {
    logger.error('❌ Failed to get all sessions:', error.message);
    return {};
  }
};

/**
 * Delete a session
 */
const deleteSession = async (sessionId) => {
  try {
    const sessions = await loadSessions();
    delete sessions[sessionId];
    await saveSessions(sessions);
    logger.info(`✅ Session deleted: ${sessionId}`);
  } catch (error) {
    logger.error('❌ Failed to delete session:', error.message);
  }
};

module.exports = {
  saveSession,
  getSession,
  getAllSessions,
  deleteSession,
  loadSessions,
  saveSessions
};
