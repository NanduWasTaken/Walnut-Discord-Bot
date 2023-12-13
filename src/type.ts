import { RESTPostAPIApplicationCommandsJSONBody, PermissionResolvable, SlashCommandBuilder } from "discord.js"

export {
    RESTPostAPIChatInputApplicationCommandsJSONBody as ChatInputCommandData,
    RESTPostAPIContextMenuApplicationCommandsJSONBody as ContextMenuCommandData
} from "discord.js"

export interface CommandObject {
    data: RESTPostAPIApplicationCommandsJSONBody | SlashCommandBuilder
    option?: CommandOption
    path?: CommandPath
    run: Function
}

export interface CommandPath {
    name: string
    category: string
}

export interface CommandOption {
    CoolDown?: number
    TestServer?: boolean
    BotPermission?: Array<PermissionResolvable>
}
