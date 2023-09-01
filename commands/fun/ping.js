const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const Guild = require('./../../models/guild');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!")  
/*.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)*/,
  async execute(interaction) {
    //console.log(interaction.guild);
  /*  const newUserInstance = new Guild({
        name: interaction.guild.name,
        id: interaction.guild.id,
        ownerId: interaction.guild.ownerId
      });
      await newUserInstance.save();*/
    
    const sent = await interaction.deferReply({ fetchReply: true });
      

    return interaction.editReply(`Websocket HeartBeat: ${interaction.client.ws.ping}ms\nRoundtrip Latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);

    
   
  },
};