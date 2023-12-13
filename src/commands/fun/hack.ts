import { ApplicationCommandOptionType, ChatInputCommandInteraction } from "discord.js"
import { ChatInputCommandData, CommandOption } from "../../type"
import config from "./../../config"

export const data: ChatInputCommandData = {
    name: "hack",
    description: "Hack Some Accounts!",
    options: [
        {
            name: "victim",
            description: "Your Victim To Hack",
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ]
}

export const options: CommandOption = {
    CoolDown: 5
}

export async function run(interaction: ChatInputCommandInteraction) {
    const author = interaction.user
    const target = interaction.options.getUser("victim", true)

    if (target.id == author.id) {
        return interaction.reply("You Can't Hack YourSelf Idiot!")
    }

    if (target.id == config.ownerId) {
        return interaction.reply("You Can't Hack The Owner Of The Bot!!")
    }

    if (target.id == interaction.client.user.id) {
        return interaction.reply("You Can't Hack Me Lol!")
    }

    if (target.bot) {
        return interaction.reply("Try Hacking An Actual Person Next Time")
    }

    interaction.deferReply()

    setTimeout(() => {
        interaction.editReply(`[▖] Finding ${target.displayName}'s Email and Password.....`)
    }, 1000)

    setTimeout(() => {
        interaction.editReply(`[▘] E-Mail: ${target.username}@gmail.com \nPassword: ********`)
    }, 6000)

    setTimeout(() => {
        interaction.editReply("[▝] Finding Other Accounts.....")
    }, 9000)

    setTimeout(() => {
        interaction.editReply("[▗] Setting up Epic Games Account.....")
    }, 12000)

    setTimeout(() => {
        interaction.editReply("[▖] Hacking Epic Games Account......")
    }, 15000)

    setTimeout(() => {
        interaction.editReply("[▘] Hacked Epic Games Account!!")
    }, 18000)

    setTimeout(() => {
        interaction.editReply("[▝] Collecting Info.....")
    }, 20000)

    setTimeout(() => {
        interaction.editReply("[▗] Selling data to FBI....")
    }, 23000)

    setTimeout(() => {
        interaction.editReply(`[▖] Finished Hacking ${target.displayName}`)
    }, 27000)
}
