import { basename, extname, join } from "node:path"
import { CommandObject } from "../type"
import { readdirSync } from "node:fs"
import { Client } from "discord.js"

export function EventsHandler(client: Client) {
    const event = files(join(__dirname, "..", "events")).sort()
    for (const Obj of event) {
        try {
            const name = basename(Obj, extname(Obj))
            const func: Function = require(Obj).default
            if (typeof func === "function") {
                client.on(name, (...arg) => {
                    func(...arg, client)
                })
            }
        } catch (error) {
            console.trace(error)
        }
    }
}

const Commands: Array<CommandObject> = []
export function CommandData(): Array<CommandObject> {
    if (Commands.length) {
        return Commands
    } else {
        const Categories = files(join(__dirname, "..", "commands"), true)

        for (const Category of Categories) {
            const Files = files(Category)
            for (const File of Files) {
                const CommandObject: CommandObject = require(File)
                if (CommandObject.data && CommandObject.run) {
                    CommandObject.path = {
                        category: Category.replace(/\\/g, "/").split("/").pop() ?? "",
                        name: basename(File, extname(File))
                    }
                    Commands.push(CommandObject)
                } else {
                    console.log(`A Command File Don't Have "data" property or "run" function`)
                }
            }
        }
        return Commands
    }
}

function files(directory: string, foldersOnly: boolean = false) {
    let fileNames = []
    const files = readdirSync(directory, { withFileTypes: true })
    for (const file of files) {
        const filePath = join(directory, file.name)

        if (foldersOnly) {
            if (file.isDirectory()) {
                fileNames.push(filePath)
            }
        } else {
            if (file.isFile()) {
                fileNames.push(filePath)
            }
        }
    }
    return fileNames
}
