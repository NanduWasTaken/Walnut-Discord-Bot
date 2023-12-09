const { Events } = require("discord.js");
const { guildId } = require("./../config");
const getLocalCommands = require("./../utils/getLocalCommands");
const getApplicationCommands = require("./../utils/getApplicationCommands");
const commandCompairing = require("./../utils/commandCompairing");

module.exports = {
  async execute(client) {
    client.once(Events.ClientReady, async () => {
      const localCommands = getLocalCommands.get();
      const applicationCommands = guildId
        ? await getApplicationCommands.get(client, guildId)
        : await getApplicationCommands.get(client);

      const mode = guildId ? "[Guild]" : "[Global]";
      const commands = await commandCompairing.compair(
        localCommands,
        applicationCommands,
      );

        if (commands) {
          const guild = await client.guilds.cache.get(guildId);
    			if (!guild) {
            console.error(`[❌] The bot has to join the guild with id "${guildId}" to register commands`);
          }
          await client.application.commands.set(
            commands,
            guildId ? guildId : undefined,
          );
        }
        console.log(
          `[✅] Successfully registered ${localCommands.length} (/) commands ${mode}`,
        );
    });
  },
};
