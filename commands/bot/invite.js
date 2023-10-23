const { SlashCommandBuilder, EmbedBuilder, OAuth2Scopes, PermissionFlagsBits } = require("discord.js");
const config = require('./../../config.js');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Get An Invite Link of the Bot!"),
  async execute(interaction) {


    const inviteLink = interaction.client.generateInvite({
      permissions: [PermissionFlagsBits.Administrator],
      scopes: [OAuth2Scopes.Bot],
    })

    const embed = new EmbedBuilder()
      .setColor('Random')
      .setTitle('Invite Me')
      .setDescription('Click the link above to invite me to your server!')
      .setURL(inviteLink)
      .setThumbnail(interaction.client.user.avatarURL({ size: 1024 }))
      .addFields({
        name:`Support Server`,
        value:`Join our support server [here](${config.supportServer})`
      })
      .setTimestamp()
      .setFooter({ text: `Requested by ${interaction.user.username}`})

    await interaction.reply({
      embeds: [embed]
    })

    return;

  },
};