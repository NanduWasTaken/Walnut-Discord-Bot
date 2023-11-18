const { Events, ActivityType } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    client.user.setPresence({
      activities: [
        {
          name: "Watching Over The Servers",
          type: ActivityType.Watching,
        },
      ],
      status: "online",
    });
  },
};
