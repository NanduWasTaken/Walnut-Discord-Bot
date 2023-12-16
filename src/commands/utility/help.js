const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  SlashCommandBuilder,
  ComponentType,
  EmbedBuilder,
} = require("discord.js");

const config = require("./../../config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Replies with help stuff!"),
  async execute(interaction) {
    const emojis = config.help_category_icon;

    let rawInfo = [];
    let commandInfo = [];
    let selectInfo = [];

    interaction.client.commands.map((cmd) => {
      rawInfo.push({
        folder: cmd.folder,
        cmd: cmd.cmd,
      });
    });

    rawInfo.forEach((cmd) => {
      const folder = cmd.folder.toLowerCase();
      const existingEntry = commandInfo.find((entry) => entry.value === folder);

      if (!existingEntry) {
        commandInfo.push({
          label: cmd.folder.charAt(0).toUpperCase() + cmd.folder.slice(1),
          value: folder,
          description: `Commands From ${cmd.folder} Category.`,
          emoji: emojis[folder] || null,
        });
      }
    });

    const select = new StringSelectMenuBuilder()
      .setCustomId("help")
      .setPlaceholder("Choose Any Command Category!")
      .addOptions(commandInfo);

    const row = new ActionRowBuilder().addComponents(select);

    const response = await interaction.reply({
      content: "Which Category You Want Help In?",
      components: [row],
    });

    const collector = response.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
      time: 300_000,
    });

    collector.on("collect", async (i) => {
      const selection = i.values[0];

      // Clear the selectInfo array
      selectInfo = [];

      // Filter rawInfo to get only the objects with matching 'folder' property
      const matchingCommands = rawInfo.filter(
        (cmd) => cmd.folder.toLowerCase() === selection,
      );

      // Push the matching objects into selectInfo
      matchingCommands.forEach((cmd) => {
        selectInfo.push({
          name: cmd.cmd.data.name,
          value: cmd.cmd.data.description,
          folder: cmd.folder,
        });
      });

      const embed = new EmbedBuilder()
        .setAuthor({
          name: interaction.client.user.username,
          url: "https://discord.com/app",
        })
        .setTitle(`Category ${selection.toUpperCase()}`)
        .addFields(selectInfo)
        .setColor("Random")
        .setFooter({
          text: `Requested by ${i.user.username}`,
        });

      await interaction.editReply({
        components: [row],
        embeds: [embed],
      });

      i.deferUpdate();
    });

    collector.on("end", async () => {
      interaction.editReply({
        components: [],
      });
    });

    return;
  },
};
