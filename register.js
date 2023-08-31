const { REST, Routes } = require('discord.js');
const { CLIENT_ID , TOKEN } = process.env;

function registerCommands(commands) {
//console.log(commands)

const rest = new REST().setToken(TOKEN);

(async () => {
	try {
		const data = await rest.put(
			Routes.applicationCommands(CLIENT_ID),
			{ body: commands },
		);
		console.log(`[✅] Registered ${data.length} application commands.`);
	} catch (error) {
		console.error(error);
	}
})();
  
}


module.exports = registerCommands;