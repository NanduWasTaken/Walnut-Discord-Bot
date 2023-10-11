const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  cooldown: 5,
  botPermissions: [
    PermissionsBitField.Flags.ManageChannels,
    PermissionsBitField.Flags.ManageMessages,
  ],
  userPermissions: [
    PermissionsBitField.Flags.ManageChannels,
    PermissionsBitField.Flags.ManageMessages,
  ],
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Test!"),
  async execute(interaction) {
    interaction.reply("hy");
    return;
  },
};
