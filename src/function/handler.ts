import { basename, extname, join } from "node:path"
import { Client } from "discord.js"
import { Files } from "./file"

export function EventsHandler(client: Client) {
    const event = Files(join(__dirname, "..", "events")).sort()
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
