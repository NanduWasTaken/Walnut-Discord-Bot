const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  permissions: ["ManageChannels", "ManageMessages"],
  data: new SlashCommandBuilder()
    .setName("prune")
    .setDescription("Prune up to 99 messages.")
    .addIntegerOption((option) =>
      option.setName("amount").setDescription("Number of messages to prune"),
    ),
  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");

    if (amount <= 1 || amount >= 100) {
      return interaction.reply(
        "You can only delete between 1 and 100 messages.",
      );
    }

    const messages = await interaction.channel.messages.fetch({
      limit: amount,
    });
    interaction.channel
      .bulkDelete(messages, true)
      .then(() => {
        interaction.reply({
          content: `Deleted ${amount} messages.`,
          ephemeral: true,
        });
      })
      .catch((error) => {
        console.error(error);
        interaction.reply("There was an error while deleting messages.");
      });
    return;
  },
};
