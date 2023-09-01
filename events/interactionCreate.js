const { Events, EmbedBuilder, Collection } = require("discord.js");
const config = require("./../config");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    const channel = interaction.client.channels.cache.get(
      config.cmd_log_channel,
    );

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

    channel.send({ embeds: [embed] });

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`,
      );
      return;
    }
    const { cooldowns } = interaction.client;

    if (!cooldowns.has(command.cmd.data.name)) {
      cooldowns.set(command.cmd.data.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.cmd.data.name);
    const defaultCooldownDuration = 3;
    const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

    if (timestamps.has(interaction.user.id)) {
      const expirationTime =
        timestamps.get(interaction.user.id) + cooldownAmount;

      if (now < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1000);
        const cooldownMessage = await interaction.reply({
          content: `Please wait, you are on a cooldown for \`${command.cmd.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`,
          ephemeral: true,
        });

        const timeRemaining = expirationTime - now;

        setTimeout(async () => {
          await cooldownMessage.delete();
        }, timeRemaining);
        return;
      }
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    try {
      await command.cmd.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  },
};
