import { Client, GatewayIntentBits } from "discord.js";
import { EventsHandler as Events } from "./function/handler";
import { connect } from "mongoose";
import config from "./config";
import("./server.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

Events(client);
client.login(config.TOKEN);
if (config.DB_URI) {
  connect(config.DB_URI).then(() =>
    console.log("Connected to MongoDB Database"),
  );
}

process.on("unhandledRejection", (reason: Error, p: Promise<any>) => {
  console.trace(reason, p);
});

process.on("uncaughtException", (err: Error, origin: string) => {
  console.trace(err, origin);
});

process.on("uncaughtExceptionMonitor", (err: Error, origin: string) => {
  console.trace(err, origin);
});
