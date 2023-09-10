const {
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  permissions: [
    PermissionFlagsBits.Administrator,
    PermissionFlagsBits.ModerateMembers,
  ],
  data: new SlashCommandBuilder()
    .setName("UserInfo")
    .setDescription("Shows User Info.")
    .addUserOption((option) =>
      option.setName("target").setDescription("The user").setRequired(true),
    ),
  execute(interaction) {
    interaction.deferReply({ ephemeral: true });
    const target = interaction.options.getUser("target");
    const member = interaction.guild.members.cache.get(target.id);
    const name = !/^[a-z0-9._]+$/.test(member.user.username)
      ? `${member.user.tag}`
      : `@${member.user.username}`;

    let roles = member.roles.cache
      .filter((role) => role.id !== interaction.guild.id)
      .map((role) => (role.name === "@everyone" ? role.name : `<@&${role.id}>`))
      .sort()
      .join(", ");
    if (!roles) {
      roles = "This user not have any roles";
    }

    interaction.followUp({
      ephemeral: true,
      embeds: [
        {
          color: 0x5865f2,
          author: {
            name: name,
            icon_url: member.displayAvatarURL(),
          },
          thumbnail: {
            url: member.displayAvatarURL(),
          },
          fields: [
            {
              name: "User Info",
              value: `ID: ${member.id}\nName: ${name}`,
            },
            {
              name: "Account Created",
              value: `<t:${(
                member.user.createdAt.getTime() / 1000.0
              ).toFixed()}:F> (<t:${(
                member.user.createdAt.getTime() / 1000.0
              ).toFixed()}:R>)`,
            },
            {
              name: "Joined Server",
              value: `<t:${(
                member.joinedAt.getTime() / 1000.0
              ).toFixed()}:F> (<t:${(
                member.joinedAt.getTime() / 1000.0
              ).toFixed()}:R>)`,
            },
            {
              name: "Roles",
              value: roles,
            },
          ],
        },
      ],
    });
  },
};
