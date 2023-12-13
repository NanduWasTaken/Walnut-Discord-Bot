import {
    ActionRowBuilder,
    ChatInputCommandInteraction,
    ComponentType,
    EmbedBuilder,
    StringSelectMenuBuilder
} from "discord.js"
import { ChatInputCommandData } from "../../type"
import { CommandData as Command } from "../../function"
import config from "./../../config.js"

export const data: ChatInputCommandData = {
    name: "help",
    description: "Replies with help stuff!"
}

interface rawInfo {
    folder: string
    cmd: string
}

export async function run(interaction: ChatInputCommandInteraction) {
    const emojis: any = config.help_category_icon

    let rawInfo: Array<rawInfo> = []
    let commandInfo: any = []
    let selectInfo: any = []

    Command().forEach((cmd) => {
        rawInfo.push({
            folder: cmd.path.category,
            cmd: cmd.path.name
        })
    })

    rawInfo.forEach((cmd) => {
        const folder = cmd.folder.toLowerCase()
        const existingEntry = commandInfo.find((entry: { value: string }) => entry.value === folder)

        if (!existingEntry) {
            commandInfo.push({
                label: cmd.folder.charAt(0).toUpperCase() + cmd.folder.slice(1),
                value: folder,
                description: `Commands From ${cmd.folder} Category.`,
                emoji: emojis[folder] ?? null
            })
        }
    })

    const select = new StringSelectMenuBuilder()
        .setCustomId("help")
        .setPlaceholder("Choose Any Command Category!")
        .addOptions(commandInfo)

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select)

    const response = await interaction.reply({
        content: "Which Category You Want Help In?",
        components: [row]
    })

    const collector = response.createMessageComponentCollector({
        componentType: ComponentType.StringSelect,
        time: 300_000
    })

    collector.on("collect", async (i) => {
        const selection = i.values[0]

        // Clear the selectInfo array
        selectInfo = []

        // Filter rawInfo to get only the objects with matching 'folder' property
        const matchingCommands = rawInfo.filter((cmd) => cmd.folder.toLowerCase() === selection)

        // Push the matching objects into selectInfo
        matchingCommands.forEach((cmd: any) => {
            selectInfo.push({
                name: cmd.cmd.data.name,
                value: cmd.cmd.data.description,
                folder: cmd.folder
            })
        })

        const embed = new EmbedBuilder()
            .setAuthor({
                name: interaction.client.user.username,
                url: "https://discord.com/app"
            })
            .setTitle(`Category ${selection.toUpperCase()}`)
            .addFields(selectInfo)
            .setColor("Random")
            .setFooter({
                text: `Requested by ${i.user.username}`
            })

        await interaction.editReply({
            components: [row],
            embeds: [embed]
        })

        i.deferUpdate()
    })

    collector.on("end", async () => {
        interaction.editReply({
            components: []
        })
    })
}
