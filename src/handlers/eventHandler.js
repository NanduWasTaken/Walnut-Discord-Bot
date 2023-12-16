const fs = require("node:fs");
const path = require("node:path");

module.exports = {
  execute(client) {
    const foldersPath = path.join(__dirname, "../events");
    const eventFolders = fs.readdirSync(foldersPath).filter((file) => {
      return fs.statSync(path.join(foldersPath, file)).isDirectory();
    });

    for (const folder of eventFolders) {
      const eventsPath = path.join(foldersPath, folder);
      const eventFiles = fs
        .readdirSync(eventsPath)
        .filter((file) => file.endsWith(".js"));

      for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
          client.once(event.name, (...args) => event.execute(...args));
        } else {
          client.on(event.name, (...args) => event.execute(...args));
        }
      }
    }
  },
};
