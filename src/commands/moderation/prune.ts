import {
  ApplicationCommandOptionType,
  ChannelType,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
} from "discord.js";
import { ChatInputCommandData, CommandOption } from "../../type";

export const data: ChatInputCommandData = {
  name: "prune",
  description: "Prune up to 100 messages",
  dm_permission: false,
  default_member_permissions: PermissionFlagsBits.ManageMessages.toString(),
  options: [
    {
      name: "amount",
      description: "Number of messages to prune",
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],
};

export const option: CommandOption = {
  BotPermission: [PermissionFlagsBits.ManageMessages],
};

export async function run(interaction: ChatInputCommandInteraction) {
  const amount = interaction.options.getInteger("amount", true);

  if (amount <= 1 || amount >= 100) {
    return interaction.reply({
      content: "You can only delete between 1 and 100 messages.",
      ephemeral: true,
    });
  }

  if (
    !interaction.channel ||
    interaction.channel.type !== ChannelType.GuildText
  )
    throw "Unknown Channel";

  const messages = await interaction.channel?.messages.fetch({
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
      interaction.reply({
        content: "There was an error while deleting messages.",
        ephemeral: true,
      });
    });
}
