const { ActivityType } = require("discord.js");

module.exports = {
  TOKEN: process.env.TOKEN,
  DB_URI: process.env.DB,
  CLIENT_ID: "1138446687287910601",
  presence: {
    status: "online",
    type: ActivityType.Listening,
    name: "Yeah this is an Activity",
  },
  help_category_icon: {
    fun: "😃",
    moderation: "⚒️",
    utility: "📙",
    ai: "🤖",
  },
  dev_mode: "true",
  GUILD_ID: "1122371463060668489",
};
