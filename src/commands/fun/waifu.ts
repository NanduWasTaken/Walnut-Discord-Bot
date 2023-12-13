import { ApplicationCommandOptionType, ChatInputCommandInteraction } from "discord.js"
import { ChatInputCommandData } from "../../type"

export const data: ChatInputCommandData = {
    name: "waifu",
    description: "Search for your waifu",
    options: [
        {
            name: "tag",
            description: "Select your tags!",
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: "Waifu",
                    value: "waifu"
                },
                {
                    name: "Maid",
                    value: "maid"
                },
                {
                    name: "Marin Kitagawa",
                    value: "marin-kitagawa"
                },
                {
                    name: "Mori Calliope",
                    value: "mori-calliope"
                },
                {
                    name: "Raiden Shogun",
                    value: "raiden-shogun"
                },
                {
                    name: "Oppai",
                    value: "oppai"
                },
                {
                    name: "Selfies",
                    value: "selfies"
                },
                {
                    name: "Uniform",
                    value: "uniform"
                }
            ]
        }
    ]
}

export async function run(interaction: ChatInputCommandInteraction) {
    const tag = interaction.options.getString("tags", true)

    try {
        await interaction.deferReply()

        const apiUrl = "https://api.waifu.im/search"
        const params = {
            included_tags: tag,
            height: ">=2000"
        }

        const queryParams = new URLSearchParams(params)

        const requestUrl = `${apiUrl}?${queryParams}`

        const response = await fetch(requestUrl)

        if (response.status !== 200) {
            return interaction.editReply("We Are Having Trouble With The Api, Please Try Again.")
        }

        const data = await response.json()

        if (data.images && data.images.length > 0) {
            interaction.editReply(data.images[0].url)
        } else {
            interaction.editReply("No images found for the specified tag.")
        }
    } catch (error) {
        console.error(error)
        interaction.editReply("An error occurred while fetching data from the API. Please try again later.")
    }
}
