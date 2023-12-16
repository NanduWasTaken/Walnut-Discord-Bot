const { Events, REST, Routes } = require("discord.js");
const { guildId } = require("./../config");

module.exports = {
  async execute(client) {
    client.once(Events.ClientReady, async () => {

      const mode = guildId ? "[Guild Only]" : "[Globally]";
      const guild = await client.guilds.cache.get(guildId);
      const Route = guildId
        ? Routes.applicationGuildCommands(client.user.id, guildId)
        : Routes.applicationCommands(client.user.id)
      
        if (!guild) {
          console.error(
            `[❌] The bot has to join the guild with id "${guildId}" to register commands`,
          );
        }
      
	const rest = new REST().setToken(client.token);

	(async () => {
		try {
			console.log(`Started refreshing ${commands.length} application (/) commands.`);
			const data = await rest.put(
       	 Route,
				{ body: commands },
		);
	console.log(
        `[✅] Successfully registered ${localCommands.length} (/) commands ${mode}`,
      );
	} catch (error) {
		console.error(`[❌] Error While Registering Commands: ${error}`);
	}
})();

      
    });
  },
};
