const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  SlashCommandBuilder,
  ComponentType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Replies with help stuff!"),
  async execute(interaction) {
    const emojis = {
      fun: "😃",
      moderation: "⚔️",
      utility: "📙",
    };

    const commandInfo = interaction.client.commands.map((cmd) => {
      const folder = cmd.folder;
      return {
        label: cmd.folder,
        value: cmd.folder.toLowerCase(),
        discription: `Commands From ${cmd.folder} Category.`,
        emoji: emojis[cmd.folder.toLowerCase() || null],
      };
    });

    console.log(commandInfo);
    // console.log(interaction.client.commands)

    const select = new StringSelectMenuBuilder()
      .setCustomId("help")
      .setPlaceholder("Choose Any Command Category!")
      .addOptions(commandInfo);

    const row = new ActionRowBuilder().addComponents(select);

    const response = await interaction.reply({
      content: "Choose your starter!",
      components: [row],
    });

    const collector = response.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
      time: 3_600_000,
    });

    collector.on("collect", async (i) => {
      const selection = i.values[0];
      await i.reply(`${i.user} has selected ${selection}!`);
    });

    return;
  },
};
