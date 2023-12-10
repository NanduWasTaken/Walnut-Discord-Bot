<!-- Banner -->
<center><a herf="https://github.com/NanduWasTaken/Walnut-Discord-Bot/tree/main#walnut"><img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Walnut&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=gradient" /></a></center>

<!-- Logo -->
<p align="center">
  <a href="https://github.com/nanduwastaken/walnut-Discord-Bot">
    <img src="https://github.com/NanduWasTaken/Walnut-Discord-Bot/assets/89532571/83ed5c41-0afe-493a-87f0-5e4c8b73d33f" alt="Walnut" width="200" height="200">
  </a>
</p>

<!-- Title & Description -->
  <h1 align="center">Walnut</h1>

  <p align="center">
    Walnut is an easy to use, advanced Discord multipurpose bot containing lot of commands.<br> It can do Moderation, Tickets, Radio, Games, Giveaways, Customisation, Economy, Leveling, Invites, Messages, Utilities, Suggestions, Server Stats etc.<br> Unfortunately the owners stopped at the peak and decided to put the source online of which I made an updated version. 
    <br />
    <br /> 
    <a href="https://github.com/nanduwastaken/walnut-discord-bot/issues">Report Bug</a>
    <bold>•</bold>
    <a href="https://github.com/nanduwastaken/walnut-discord-bot/issues">Request Feature</a>  
    <bold>•</bold>
    <a href="https://github.com/nanduwastaken/walnut-discord-bot/issues">Questions</a>
  </p>

<!-- Replit Logo -->

[![Run on Repl.it](https://repl.it/badge/github/NanduWasTaken/Walnut-Discord-Bot)](https://replit.com/@NanduWasTaken/Walnuut?v=1)

### Notice

> You may not claim this as your own! The original source was created by [NanduWasTaken](https://github.com/NanduWasTaken). You should credit the orginal owners on your project if you are using this bot.

> Walnut is a multipurpose Discord bot base on [Discord.js](https://github.com/Discordjs/discordjs)
> If you like this repository, feel free to leave a star ⭐ to motivate me!

<!-- Features -->

## Features

- [x] Slash Commands
- [x] Upto date with Discord.js v14
- [x] Utility Commands
- [x] Fun Commands
- [x] Dynamic Help Command
- [x] Easy to use
- [x] Don't wanna host it yourself? [Use our public bot](https://discord.com/app)

## Requirements

- NodeJs v17+. Download it from [NodeJS](https://nodejs.org/en/download/current)
- Discord Token. Get it from [Discord Developers Portal](https://discord.com/developers/applications)
- Mongo Database URL. Get it from [MongoDB](https://cloud.mongodb.com/v2/635277bf9f5c7b5620db28a4#clusters)

## Setting Up Your Own Walnut

Clone the repo by running on your terminal

```bash
git clone https://github.com/NanduWasTaken/Walnut-Discord-Bot
```

Install the Required [Packages](https://github.com/NanduWasTaken/Walnut-Discord-Bot/tree/main#used-pakages--modules)

```bash
npm i
```

Fill in the Bot Token Field in the `config.js` file &
Start Your Bot

```bash
npm run start
```

## Configuration

On your config.js file you can modify settings

```js
module.exports = {
  TOKEN: process.env.TOKEN, // Your Bot Token
  DB_URI: process.env.DB_URI, // Your MongoDB Database URI
  port: process.env.PORT, // Your Website Port
  help_category_icon: {
    // Help Category icon shows in the select menu of /help
    fun: "😃",
    moderation: "⚒️",
    utility: "📙",
    ai: "🤖",
    bot: "💥",
  },
  guildId: "", // ID of the server to register guild commands. (If you leave none then the commands will register globally)
  ownerId: "852381000528035890", // Owners Discord ID. Gives immune to some fun commands
  supportServer: "https://discord.gg/nPCNpEPWTh", // Your support discord server
};
```

## Used Pakages & Modules

- Discord.js v14+
- Undici (For Api Required Commands)
- Mongoose (For Mongo DB Database)

## Contributers

<a href="https://github.com/nanduwastaken/Walnut-Discord-Bot/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=nanduwastaken/Walnut-Discord-Bot" />
</a>
