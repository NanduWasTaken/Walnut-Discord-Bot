const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  cooldown: 5,  
  permissions: ["ManageChannels", "ManageMessages"],
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Test!"),
  async execute(interaction) {
    interaction.reply('hy')
  },
};
