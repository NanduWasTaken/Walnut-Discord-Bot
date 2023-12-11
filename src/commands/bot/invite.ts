import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  EmbedBuilder,
  OAuth2Scopes,
  PermissionFlagsBits,
} from "discord.js";
import { ChatInputCommandData, CommandOption } from "../../type";
import config from "./../../config";

export const data: ChatInputCommandData = {
  name: "invite",
  description: "Get An Invite Link of the Bot!",
};

export const options: CommandOption = {
  CoolDown: 5,
};

export async function run(interaction: ChatInputCommandInteraction) {
  const inviteLink = interaction.client.generateInvite({
    permissions: [PermissionFlagsBits.Administrator],
    scopes: [OAuth2Scopes.Bot],
  });

  const embed = new EmbedBuilder()
    .setColor("Random")
    .setTitle("Invite Me")
    .setDescription("Click the link above to invite me to your server!")
    .setURL(inviteLink)
    .setThumbnail(interaction.client.user.avatarURL({ size: 1024 }))
    .addFields({
      name: `Support Server`,
      value: `Join our support server [here](${config.supportServer})`,
    })
    .setTimestamp()
    .setFooter({ text: `Requested by ${interaction.user.username}` });

  const link = new ButtonBuilder()
    .setLabel("Invite Me")
    .setURL(inviteLink)
    .setEmoji("📥")
    .setStyle(ButtonStyle.Link);

  const supportServer = new ButtonBuilder()
    .setLabel("Support Server")
    .setURL(config.supportServer)
    .setEmoji("🗂️")
    .setStyle(ButtonStyle.Link);

  const row = new ActionRowBuilder<ButtonBuilder>({
    components: [link, supportServer],
  });

  interaction.reply({ embeds: [embed], components: [row] });
}
