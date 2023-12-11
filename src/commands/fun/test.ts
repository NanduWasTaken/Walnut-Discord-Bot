import { ChatInputCommandInteraction } from "discord.js";
import { ChatInputCommandData } from "../../type";
import { uptime } from "coolcake";

export const data: ChatInputCommandData = {
  name: "test",
  description: "Check Bot Status",
};

export async function run(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();
  const reply = await interaction.fetchReply();
  const ping = reply.createdTimestamp - interaction.createdTimestamp;
  interaction.followUp({
    embeds: [
      {
        color: 0x5865f2,
        description: `Client: ${ping}ms \nWebsocket: ${
          interaction.client.ws.ping
        }ms \nUptime: ${uptime()}`,
      },
    ],
  });
}
