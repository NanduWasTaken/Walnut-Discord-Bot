import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { CommandObject } from "../../type"
import { uptime } from "coolcake"

export default {
    data: new SlashCommandBuilder().setName("test").setDescription("Check Bot Status"),

    run: async function (interaction: ChatInputCommandInteraction) {
        await interaction.deferReply()
        const reply = await interaction.fetchReply()
        const ping = reply.createdTimestamp - interaction.createdTimestamp
        interaction.followUp({
            embeds: [
                {
                    color: 0x5865f2,
                    description: `Client: ${ping}ms \nWebsocket: ${interaction.client.ws.ping}ms \nUptime: ${uptime()}`
                }
            ]
        })
    }
} satisfies CommandObject
