const crypto = require('crypto');

/**
 * Generate unique session ID
 * @returns {string} Unique session ID
 */
const generateSessionId = () => {
  return crypto.randomBytes(12).toString('hex');
};

/**
 * Generate fake session for user customization
 * @returns {string} Fake session token
 */
const generateFakeSession = () => {
  return crypto.randomBytes(20).toString('hex');
};

/**
 * Validate session ID format
 * @param {string} sessionId - Session to validate
 * @returns {boolean} Is valid
 */
const isValidSessionId = (sessionId) => {
  return /^[a-f0-9]{24}$/.test(sessionId);
};

module.exports = {
  generateSessionId,
  generateFakeSession,
  isValidSessionId
};