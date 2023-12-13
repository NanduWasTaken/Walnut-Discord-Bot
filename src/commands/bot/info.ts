import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChatInputCommandInteraction,
    EmbedBuilder,
    OAuth2Scopes,
    PermissionFlagsBits
} from "discord.js"
import { ChatInputCommandData } from "../../type"
import config from "./../../config"

export const data: ChatInputCommandData = {
    name: "info",
    description: "Get Info About The Bot!"
}

export async function run(interaction: ChatInputCommandInteraction) {
    const inviteLink = interaction.client.generateInvite({
        permissions: [PermissionFlagsBits.Administrator],
        scopes: [OAuth2Scopes.Bot]
    })

    const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle(`Information About ${interaction.client.user.username}`)
        .setDescription("Lorem Ipsum")
        .setURL(inviteLink)
        .setThumbnail(interaction.client.user.avatarURL({ size: 1024 }))
        .addFields(
            {
                name: "👑┆Owner Name",
                value: "[NanduWasTaken](https://github.com/NanduWasTaken)",
                inline: true
            },
            {
                name: `🗂️┆Support Server`,
                value: `[Walnut](${config.supportServer})`,
                inline: true
            },
            {
                name: "🏢┆Organization",
                value: "[Walnuut](https://github.com/walnuut)",
                inline: true
            },
            {
                name: "🌐┆Website",
                value: "[Website](https://nandu.is-cool.dev/Walnut-Discord-Bot)",
                inline: true
            }
        )
        .setTimestamp()
        .setFooter({ text: `Requested by ${interaction.user.username}` })

    const link = new ButtonBuilder().setLabel("Invite Me").setURL(inviteLink).setEmoji("📥").setStyle(ButtonStyle.Link)

    const supportServer = new ButtonBuilder()
        .setLabel("Support Server")
        .setURL(config.supportServer)
        .setEmoji("🗂️")
        .setStyle(ButtonStyle.Link)

    const botWebsite = new ButtonBuilder()
        .setLabel("Website")
        .setURL("https://nandu.is-cool.dev/Walnut-Discord-Bot")
        .setEmoji("🌐")
        .setStyle(ButtonStyle.Link)

    const row = new ActionRowBuilder<ButtonBuilder>({
        components: [link, supportServer, botWebsite]
    })

    interaction.reply({ embeds: [embed], components: [row] })
}
