const QRCode = require('qrcode');
const crypto = require('crypto');
const { logger } = require('../utils/logger');
const { generateSessionId } = require('./sessionManager');

class PairingSystem {
  constructor() {
    this.sessions = new Map();
    this.qrCodes = new Map();
    this.pushNotifications = new Map();
  }

  /**
   * Generate QR Code for pairing
   * @param {string} sessionId - Unique session identifier
   * @returns {Promise<object>} QR code and session info
   */
  async generateQRCode(sessionId) {
    try {
      const qrData = JSON.stringify({
        sessionId: sessionId,
        timestamp: Date.now(),
        version: '1.0.0'
      });

      const qrCode = await QRCode.toDataURL(qrData);
      this.qrCodes.set(sessionId, { code: qrCode, createdAt: Date.now() });
      
      logger.info(`✅ QR Code generated for session: ${sessionId}`);
      return { success: true, qrCode, sessionId };
    } catch (error) {
      logger.error('❌ Failed to generate QR code:', error);
      throw error;
    }
  }

  /**
   * Generate push notification code
   * @param {string} userNumber - User's WhatsApp number (e.g., 234xxxxxxx)
   * @returns {object} 8-digit code and session info
   */
  generatePushCode(userNumber) {
    try {
      // Generate random 8-digit code
      const code = Math.floor(10000000 + Math.random() * 90000000).toString();
      const sessionId = generateSessionId();

      this.pushNotifications.set(sessionId, {
        code: code,
        userNumber: userNumber,
        createdAt: Date.now(),
        verified: false,
        attempts: 0
      });

      logger.info(`📱 Push code generated for ${userNumber}: ${code}`);
      
      return {
        success: true,
        sessionId: sessionId,
        code: code,
        userNumber: userNumber,
        expiresIn: 600 // 10 minutes
      };
    } catch (error) {
      logger.error('❌ Failed to generate push code:', error);
      throw error;
    }
  }

  /**
   * Create session after successful pairing
   * @param {string} sessionId - Session ID from pairing
   * @param {string} userNumber - User's number
   * @param {string} pairingMethod - 'qr' or 'push'
   * @returns {object} Session details
   */
  createSession(sessionId, userNumber, pairingMethod) {
    try {
      const newSession = {
        sessionId: sessionId,
        userNumber: userNumber,
        pairingMethod: pairingMethod,
        createdAt: Date.now(),
        lastActive: Date.now(),
        status: 'ACTIVE',
        adminNumber: process.env.ADMIN_NUMBER || 'NOT_SET',
        fakeSession: crypto.randomBytes(16).toString('hex')
      };

      this.sessions.set(sessionId, newSession);
      logger.info(`✅ Session created: ${sessionId}`);
      
      return newSession;
    } catch (error) {
      logger.error('❌ Failed to create session:', error);
      throw error;
    }
  }

  /**
   * Verify push notification code
   * @param {string} sessionId - Session ID
   * @param {string} code - 8-digit code from user
   * @returns {boolean} Verification result
   */
  verifyPushCode(sessionId, code) {
    try {
      const notification = this.pushNotifications.get(sessionId);
      
      if (!notification) {
        logger.warn(`❌ Session not found: ${sessionId}`);
        return false;
      }

      if (notification.verified) {
        logger.warn(`❌ Session already verified: ${sessionId}`);
        return false;
      }

      if (notification.code === code) {
        notification.verified = true;
        logger.info(`✅ Push code verified for ${notification.userNumber}`);
        return true;
      }

      notification.attempts++;
      logger.warn(`❌ Invalid code attempt ${notification.attempts} for ${notification.userNumber}`);
      return false;
    } catch (error) {
      logger.error('❌ Failed to verify push code:', error);
      throw error;
    }
  }

  /**
   * Get session info
   * @param {string} sessionId - Session ID
   * @returns {object} Session details
   */
  getSession(sessionId) {
    return this.sessions.get(sessionId) || null;
  }

  /**
   * List all active sessions
   * @returns {array} Active sessions
   */
  getAllSessions() {
    return Array.from(this.sessions.values()).filter(s => s.status === 'ACTIVE');
  }
}

const initPairingSystem = async () => {
  return new PairingSystem();
};

module.exports = { PairingSystem, initPairingSystem };