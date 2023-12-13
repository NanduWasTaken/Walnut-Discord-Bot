import { CommandData as Command } from "../function"
import { Interaction } from "discord.js"

const CoolDown = new Set()
export default async function (interaction: Interaction) {
    if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
        const command = Command().find((cmd) => cmd.data.name === interaction.commandName)
        try {
            if (!command || !command.run || typeof command.run !== "function") {
                return interaction.reply({
                    embeds: [
                        {
                            color: 0x5865f2,
                            description: "Unknown Command"
                        }
                    ]
                })
            }
            const Option = command?.option

            if (Option) {
                if (Option.CoolDown) {
                    // Do something
                }

                if (Option.BotPermission) {
                    let allow = false
                    for (const permission of Option.BotPermission) {
                        if (interaction.guild?.members.me?.permissions.has(permission)) allow = true
                    }

                    if (!allow) {
                        return interaction.reply({
                            ephemeral: true,
                            embeds: [
                                {
                                    color: 0x5865f2,
                                    description: "Oh no.... I don't have permission to run this command"
                                }
                            ]
                        })
                    }
                }
                command.run(interaction)
            } else {
                command.run(interaction)
            }
        } catch (error) {
            console.log(error)
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: "There was an error while executing this command!",
                    ephemeral: true
                })
            } else {
                await interaction.reply({
                    content: "There was an error while executing this command!",
                    ephemeral: true
                })
            }
        }
    }
}
