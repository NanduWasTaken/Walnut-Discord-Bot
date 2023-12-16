const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `[❌] No command matching ${interaction.commandName} was found.`,
      );
      return interaction.reply("No command matching this name was found.");
    }

    const { cooldowns } = interaction.client;

    if (!cooldowns.has(command.cmd.data.name)) {
      cooldowns.set(command.cmd.data.name, new Map());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.cmd.data.name);
    const defaultCooldown = (command.cooldown ?? 3) * 1000;

    if (timestamps.has(interaction.user.id)) {
      const expirationTime =
        timestamps.get(interaction.user.id) + defaultCooldown;
      if (now < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1000);
        const cooldownMessage = await interaction.reply({
          content: `Please wait, you are on a cooldown for \`${command.cmd.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`,
          ephemeral: true,
        });
        const timeRemaining = expirationTime - now;
        setTimeout(async () => await cooldownMessage.delete(), timeRemaining);
        return;
      }
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), defaultCooldown);

    try {
      const botPermissions = command.cmd.botPermissions;
      const userPermissions = command.cmd.userPermissions;

      if (botPermissions || userPermissions) {
        if (!interaction.member.permissions.has(userPermissions)) {
          return await interaction.reply({
            content: `You don't have enough permissions to run this command.`,
            ephemeral: true,
          });
        }

        if (!interaction.guild.members.me.permissions.has(botPermissions)) {
          return await interaction.reply({
            content: `I don't have enough permissions to execute this command.`,
            ephemeral: true,
          });
        }
      }

      await command.cmd.execute(interaction);
    } catch (error) {
      console.error(
        `[❌] Error While Executing Command: ${interaction.commandName}`,
        error,
      );
      if (interaction.replied || interaction.deferred) {
        return await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        return await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  },
};
