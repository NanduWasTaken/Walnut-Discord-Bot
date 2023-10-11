const registerCommands = require("./../register");
const fs = require("node:fs");
const path = require("node:path");

module.exports = {
  execute(client) {
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
          commands.push(cmd.data.toJSON());
          const properties = { folder, cmd };
          client.commands.set(cmd.data.name, properties);
        } else {
          console.log(
            `[❓] The command at ${filePath} is missing a required "data" or "execute" property.`,
          );
        }
      }
    }

    registerCommands(commands);
  },
};
