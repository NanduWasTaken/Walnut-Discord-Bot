const { REST, Routes } = require('discord.js');
const { TOKEN } = process.env;
const { CLIENT_ID, GUILD_ID, dev_mode } = require('./config');

function registerCommands(commands) {
  const rest = new REST().setToken(TOKEN);

  const route = dev_mode
    ? Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID)
    : Routes.applicationCommands(CLIENT_ID);

  (async () => {
    try {
      const data = await rest.put(route, { body: commands });
      console.log(`[✅] Registered ${data.length} application commands.`);
    } catch (error) {
      console.error(error);
    }
  })();
}

module.exports = registerCommands;

