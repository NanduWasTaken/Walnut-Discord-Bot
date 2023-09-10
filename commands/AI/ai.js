const {
  PermissionsBitField,
  ChannelType,
  SlashCommandBuilder,
} = require("discord.js");
const ai = require("./../../models/ai.js");

module.exports = {
  cooldown: 60,
  permissions: [
    PermissionsBitField.Flags.ManageChannels,
    PermissionsBitField.Flags.ManageMessages,
  ],
  data: new SlashCommandBuilder()
    .setName("ai")
    .setDescription("Integrate AI commands to your server.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("channel")
        .setDescription("Set the channel for the AI to interact.")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("Choose the channel for the AI to chat in.")
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("model")
        .setDescription("Set the model for the AI.")
        .addStringOption((option) =>
          option
            .setName("models")
            .setDescription("Choose an AI model.")
            .setRequired(true)
            .addChoices(
              { name: "GPT-3.5 Turbo", value: "gpt-3.5-turbo" },
              { name: "Meme", value: "gif_meme" },
              { name: "Movie", value: "gif_movie" },
            ),
        ),
    ),
  async execute(interaction, client) {
    if (interaction.options.getSubcommand() === "channel") {
      const value = interaction.options.getChannel("channel").id;

      await interaction.deferReply();

      try {
        const ownerID = interaction.guild.ownerId;
        const guildID = interaction.guildId;

        let aiDoc = await ai.findOne({ guild_id: guildID });

        if (!aiDoc) {
          aiDoc = new ai({
            owner_id: ownerID,
            guild_id: guildID,
            system_prompt: `You are a friendly chat bot. Your name is ${interaction.client.username}. You are currently in a Discord server called ${interaction.guild.name}`,
            channel_id: value,
          });
        } else {
          aiDoc.channel_id = value;
          aiDoc.owner_id = ownerID;
        }

        await aiDoc.save();

        await interaction.editReply(
          `AI Channel was set to <#${value}>. Make sure the bot has permission to chat in the channel.`,
        );
      } catch (err) {
        console.log(err);
      }
    }
  },
};
