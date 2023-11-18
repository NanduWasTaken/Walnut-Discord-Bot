const fs = require("node:fs");
const path = require("node:path");

module.exports = {
  execute(client) {
    const foldersPath = path.join(__dirname, "../commands");
    const commandFolders = fs
      .readdirSync(foldersPath)
      .filter((file) => {
  return fs
    .statSync(path.join(foldersPath, file))
    .isDirectory();
});
    

    for (const folder of commandFolders) {

      const commandsPath = path.join(foldersPath, folder);
      const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".js"));
      
      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const cmd = require(filePath);
        if ("data" in cmd && "execute" in cmd) {
          const duplicateCommand = client.commands.get(cmd.data.name);
          if (duplicateCommand) {
            console.warn(
              `[❓] Duplicate Command Ignored: ${cmd.data.name} command in ${filePath}`,
            );
            continue;
          }
          const properties = { folder, cmd };
          client.commands.set(cmd.data.name, properties);
        } else {
          console.warn(
            `[❓] The command at ${filePath} is missing a required "data" or "execute" property.`,
          );
        }
      }
    }
  },
};
