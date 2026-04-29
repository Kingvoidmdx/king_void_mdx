# KING_VOID<>MDX 🤖

**A secure, multi-platform WhatsApp bot base with dual pairing methods.**

> Made with ❤️ by **King Val** | Works on Termux, Render, Pterodactyl & More

---

## 🎯 Features

- ✅ **Dual Pairing Methods**: QR Code + Push Notification (8-digit code)
- ✅ **Session Management**: Secure session IDs with custom fake sessions
- ✅ **Multi-Platform**: Termux, PC/Windows, macOS, iPhone, Android (via Pterodactyl)
- ✅ **Easy Setup**: Simple configuration without exposing secrets
- ✅ **Command Handler**: Modular command system
- ✅ **Webhook Support**: Ready for external integrations
- ✅ **Logging System**: Comprehensive error tracking
- ✅ **Environment Variables**: Secure configuration management

---

## 🚀 Quick Start

### **Termux Installation**

```bash
# Update packages
pkg update -y && pkg upgrade -y

# Install required tools
pkg install git nodejs-lts python3 -y

# Setup storage
termux-setup-storage

# Clone repository
git clone https://github.com/Kingvoidmdx/king_void_mdx.git
cd king_void_mdx

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env and add your:
# - ADMIN_NUMBER (e.g., 234xxxxxxx)
# - FAKE_SESSION

# Start bot
npm start
```

### **Windows/macOS/Linux Installation**

```bash
# Clone repository
git clone https://github.com/Kingvoidmdx/king_void_mdx.git
cd king_void_mdx

# Install Node.js from nodejs.org
# Then:
npm install
cp .env.example .env

# Edit .env file with your settings
npm start
```

### **Pterodactyl Panel Installation**

1. **Upload**: Upload the zip file to your panel
2. **Unarchive**: Extract the files
3. **Configure**: Edit `index.js` and `.env`
4. **Setup**:
   - Change `FAKE_SESSION` and `ADMIN_NUMBER` only
   - Don't modify other settings
5. **Start**: Click Start in the panel

---

## 🔐 Pairing System

### **Option 1: QR Code Pairing**

```
1. Run: npm start
2. Scan QR Code with WhatsApp
3. Bot auto-connects
```

### **Option 2: Push Notification Pairing**

```
1. Enter your WhatsApp number: 234xxxxxxx
2. Receive 8-digit code via WhatsApp push notification
3. Enter the code in terminal
4. Bot automatically pairs
```

---

## 📝 Project Structure

```
king_void_mdx/
├── src/
│   ├── app.js              # Main bot engine
│   ├── pairing/            # Pairing system
│   │   ├── index.js
│   │   └── sessionManager.js
│   ├── commands/           # Commands directory
│   │   ├── loader.js
│   │   └── ping.js         # Example command
│   └── utils/
│       └── logger.js       # Logging system
├── config/
│   └── settings.js         # Configuration file
├── data/                   # Session/user data (auto-created)
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies
├── index.js                # Entry point
└── README.md               # This file
```

---

## ⚙️ Configuration

### Edit `.env` file:

```env
# Your WhatsApp number (without +)
ADMIN_NUMBER=234xxxxxxx

# Your fake session (keep secret)
FAKE_SESSION=random_string_here

# Server port
PORT=3000
```

### For Each User (Pterodactyl):

1. Edit `index.js`:
   ```javascript
   // Change only these two lines:
   const FAKE_SESSION = 'their_unique_session';
   const ADMIN_NUMBER = 'their_number'; // e.g., 234xxxxxxx
   ```

2. Keep everything else unchanged

---

## 📱 Creating Custom Commands

Create a new file in `src/commands/`:

```javascript
// src/commands/hello.js
module.exports = {
  name: 'hello',
  description: 'Say hello',
  category: 'fun',
  execute: async (message, botInstance) => {
    return {
      success: true,
      message: '👋 Hello from KING_VOID<>MDX!'
    };
  }
};
```

---

## 🔒 Security Features

- ✅ Secrets protected via `.env` (never committed)
- ✅ Session IDs encrypted with crypto
- ✅ Push notification verification (8-digit code)
- ✅ Rate limiting on pairing attempts
- ✅ Logging all activities for debugging

---

## 🐛 Troubleshooting

### **"Module not found" error**
```bash
rm -rf node_modules package-lock.json
npm install
```

### **Port already in use**
```bash
# Change PORT in .env
PORT=3001
```

### **QR Code not generating**
```bash
# Check permissions and reinstall
npm install qrcode --save
```

---

## 📚 API Endpoints (Coming Soon)

- `POST /api/pairing/qr` - Generate QR code
- `POST /api/pairing/push` - Generate push code
- `POST /api/pairing/verify` - Verify pairing
- `GET /api/sessions` - List active sessions
- `POST /api/commands/execute` - Execute command

---

## 🤝 Contributing

Found a bug? Want to add features? Open an issue or pull request!

---

## 📄 License

MIT License - See LICENSE file

---

## 👨‍💻 About

**KING_VOID<>MDX** is a beginner-friendly bot base designed for:
- 🇳🇬 Nigerian developers
- 📱 Termux users
- 🚀 Learners and hobbyists
- 💪 Anyone building WhatsApp bots

**Built with**: Node.js, Express, QRCode, dotenv

---

## 📞 Support

Have questions? Drop an issue on GitHub!

**GitHub**: [Kingvoidmdx](https://github.com/Kingvoidmdx)  
**Bot Name**: KING_VOID<>MDX  
**Version**: 1.0.0

---

*Made with 💚 for the community*