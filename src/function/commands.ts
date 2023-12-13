import { join, extname, basename } from "path"
import { CommandObject } from "../type"
import { Files as files } from "./file"

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
