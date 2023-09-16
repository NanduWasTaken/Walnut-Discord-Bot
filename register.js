const { REST, Routes } = require("discord.js");
const { TOKEN, CLIENT_ID, GUILD_ID, dev_mode } = require("./config");

const registerCommands = async (commands) => {

  const rest = new REST().setToken(TOKEN);

  const route = dev_mode
    ? Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID)
    : Routes.applicationCommands(CLIENT_ID);
  
  const log = dev_mode ? "(GUILD)" : "(GLOBALLY)";

  try {
    const data = await rest.put(route, { body: commands });
    console.log(`[✅] Registered ${data.length} application commands ${log}.`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = registerCommands;
