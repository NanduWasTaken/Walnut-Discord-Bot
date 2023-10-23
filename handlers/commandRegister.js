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

      try {
        await client.application.commands.set(
          commands,
          guildId ? guildId : undefined,
        );
        console.log(
          `[✅] Successfully registered ${localCommands.length} (/) commands ${mode}`,
        );
      } catch (error) {
        console.error("[❌] Error While Registering Commands:", error);
      }
    });
  },
};
