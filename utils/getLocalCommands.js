const fs = require("node:fs");
const path = require("node:path");

module.exports = {
  get() {
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
        } else {
          console.log(
            `[❓] The command at ${filePath} is missing a required "data" or "execute" property.`,
          );
        }
      }
    }
    return commands;
  },
};
