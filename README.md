# KING_VOID<>MDX

A clean multi-platform bot base by **King Val**.

## Features

- Node.js starter bot base
- Termux friendly
- Render ready
- Pterodactyl friendly
- Easy to edit
- Beginner friendly
- Simple project structure
- Environment variable support

## Owner

**King Val**  
GitHub: [Kingvoidmdx](https://github.com/Kingvoidmdx)

## Installation

### Termux

```bash
pkg update -y && pkg upgrade -y
pkg install git nodejs-lts -y
termux-setup-storage
git clone https://github.com/Kingvoidmdx/king_void_mdx.git
cd king_void_mdx
npm install
cp .env.example .env
npm start
