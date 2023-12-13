import { ApplicationCommandOptionType, ChatInputCommandInteraction } from "discord.js"
import { ChatInputCommandData } from "../../type"
import { fetch } from "undici"

export const data: ChatInputCommandData = {
    name: "chat",
    description: "Chat With An AI!",
    options: [
        {
            name: "msg",
            description: "Enter your message.",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ]
}

export async function run(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ fetchReply: true })
    const msg = interaction.options.getString("msg", true)

    const apiUrl = "https://api.popcat.xyz/chatbot"
    const params = {
        owner: `[NanduWasTaken](https://github.com/NanduWasTaken)`,
        botname: interaction.client.user.username,
        msg: msg
    }

    const queryParams = new URLSearchParams(params)
    const requestUrl = `${apiUrl}?${queryParams}`

    const response = await fetch(requestUrl)

    if (response.status !== 200) return interaction.editReply("We Are Having Trouble With The Api, Please Try Again.")

    const data: any = await response.json()
    interaction.editReply(data.response)
}
