const { Events, ActivityType } = require("discord.js");
const config = require('./../config');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    client.user.setPresence(
      {
        activities: [{
          name: config.presence.name,
          type: config.presence.type,
        }],
        status: config.presence.status,
      });
    console.log(`[✅] Logged in as ${client.user.tag}`);
  },
};

