const { Events, REST, Routes } = require("discord.js");
const { guildId } = require("./../config");
const fs = require("node:fs");
const path = require("node:path");

module.exports = {
  async execute(client) {
    client.once(Events.ClientReady, async () => {
      const mode = guildId ? "[Guild Only]" : "[Globally]";
      const Route = guildId
        ? Routes.applicationGuildCommands(client.user.id, guildId)
        : Routes.applicationCommands(client.user.id);

      if (guildId) {
      	const guild = await client.guilds.cache.get(guildId);
        if(!guild) {
         console.error(
           `[❌] The bot has to join the guild with id "${guildId}" to register commands`,
         );
        }
      }


      const commands = [];
      const foldersPath = path.join(__dirname, "../commands");
      const commandFolders = fs.readdirSync(foldersPath);

      for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs
          .readdirSync(commandsPath)
          .filter((file) => file.endsWith(".js"));
        for (const file of commandFiles) {
          const filePath = path.join(commandsPath, file);
          const cmd = require(filePath);
          if ("data" in cmd && "execute" in cmd) {
            const duplicateCommand = commands.find(
              (command) => command.name === cmd.data.name,
            );
            if (duplicateCommand) {
              continue;
            }
            commands.push(cmd.data.toJSON());
          }
        }
      }

      const rest = new REST().setToken(client.token);

      (async () => {
        try {
          const data = await rest.put(Route, { body: commands });
          console.log(
            `[✅] Successfully registered ${commands.length} (/) commands ${mode}`,
          );
        } catch (error) {
          console.error(`[❌] Error While Registering Commands: `, error);
        }
      })();
    });
  },
};
