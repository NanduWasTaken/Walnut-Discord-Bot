import { ActivityType, Client, REST, RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord.js"
import { CommandData } from "../function/handler"
import config from "../config"

export default async function (client: Client<true>) {
    console.log(`${client.user.tag} is online`)
    RegisterCommand(client)
    status(client)
}

async function status(client: Client<true>) {
    client.user.setPresence({
        status: "online",
        activities: [
            {
                name: "Watching Over The Servers",
                type: ActivityType.Watching
            }
        ]
    })
}

export async function RegisterCommand(client: Client<true>) {
    const rest = new REST().setToken(client.token)
    const command = CommandData()
    const commands: Array<RESTPostAPIApplicationCommandsJSONBody> = []
    const TestCommands: Array<RESTPostAPIApplicationCommandsJSONBody> = []

    for (const x of command) {
        if (x.data && typeof x.data.name === "string") {
            if (x.option?.TestServer) {
                TestCommands.push(x.data)
            } else {
                commands.push(x.data)
            }
        }
    }

    try {
        const data: any = await rest.put(Routes.applicationCommands(client.user.id), { body: commands })
        console.log(`Successfully reloaded ${data.length} application (/) commands.`)

        if (TestCommands.length > 0) {
            for (const x of config.guildId) {
                await rest
                    .put(Routes.applicationGuildCommands(client.user.id, x), { body: TestCommands })
                    .then(() =>
                        console.log(`Successfully reloaded ${TestCommands.length} application (/) commands for test.`)
                    )
            }
        }
    } catch (error) {
        console.trace(error)
    }
}
