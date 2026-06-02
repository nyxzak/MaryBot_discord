# MaryBot_discord
# 🌸 Mary Bot

> A Discord bot that brings anime and manga information right to your server.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Discord.js](https://img.shields.io/badge/Discord.js-5865F2?style=flat&logo=discord&logoColor=white)
![Railway](https://img.shields.io/badge/Deployed%20on-Railway-0B0D0E?style=flat&logo=railway&logoColor=white)

---

## 📖 About

Mary is a Discord bot built with **Node.js** and **Discord.js** that allows users to search for anime and manga information directly from Discord. It fetches real-time data from the [Jikan API](https://jikan.moe/) (unofficial MyAnimeList API), returning details like synopsis, score, episodes, and more.

---

## ✨ Features

- 🔍 Search for **anime** by name and get detailed info
- 📚 Search for **manga** by name and get detailed info
- 📊 Returns data such as score, status, episodes/chapters, and synopsis
- ⚡ Slash commands for a clean, modern Discord experience
- 🚀 Deployed and always online via Railway

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Discord.js v14 | Discord API interaction |
| Jikan API | Anime & manga data source |
| Railway | Cloud deployment |

---

## 📂 Project Structure

```
MaryBot_discord/
├── commands/
│   ├── anime.js       # /anime command
│   └── manga.js       # /manga command
├── index.js           # Entry point, bot setup & command loader
├── package.json
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- A Discord bot token ([Discord Developer Portal](https://discord.com/developers/applications))

### Installation

```bash
# Clone the repository
git clone https://github.com/nyxzak/MaryBot_discord.git
cd MaryBot_discord

# Install dependencies
npm install
```

### Configuration

Create a `.env` file in the root of the project:

```env
TOKEN=your_discord_bot_token
CLIENT_ID=your_application_client_id
```

### Running the bot

```bash
# Register slash commands
node deploy-commands.js

# Start the bot
node index.js
```

---

## 💬 Commands

| Command | Description |
|---|---|
| `/anime <name>` | Search for an anime and get detailed info |
| `/manga <name>` | Search for a manga and get detailed info |

---

## 📡 API

This bot uses the **[Jikan API v4](https://docs.api.jikan.moe/)** — a free, open-source REST API for MyAnimeList data. No API key required.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ by <a href="https://github.com/nyxzak">nyxzak</a></p>
