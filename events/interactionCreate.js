const { Events, EmbedBuilder } = require('discord.js');
const config = require('./../config')

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    const channel = interaction.client.channels.cache.get(config.cmd_log_channel);

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${interaction.client.user.username}`,
        iconURL: `https://cdn.discordapp.com/avatars/${interaction.client.user.id}/${interaction.client.user.avatar}.png`,
      })
      .setTitle("Command Logger")
      .addFields(
        {
          name: "User",
          value: `${interaction.user.username}\n${interaction.user.id}`,
        },
        {
          name: "Used Command",
          value: `${interaction.commandName}`,
        },
        {
          name: "Used Guild",
          value: `${interaction.guild.name}\n${interaction.guild.id}`,
        },
        {
          name: "Time",
          value: `${interaction.createdAt}`,
        },
      )
      .setColor("#ffff00")
      .setFooter({
        text: `${interaction.client.user.username}`,
      })
      .setTimestamp();

    channel.send({embeds: [embed]})

   const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
  },
};