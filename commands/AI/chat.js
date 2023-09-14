const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const fetch = require('@replit/node-fetch')

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("chat")
    .setDescription("Chat With An AI!")
    .addStringOption(option =>
      option
        .setName('msg')
        .setDescription('Enter your message.')
        .setRequired(true) 
    ),
  async execute(interaction) {

  const msg = interaction.options.getString('msg');
    
    const sent = await interaction.deferReply({ fetchReply: true });

    const apiUrl = 'https://api.popcat.xyz/chatbot';
    const params = {
      owner: `[NanduWasTaken](https://github.com/NanduWasTaken)`,
      botname: interaction.client.user.username,
      msg: msg,     
    };
    
    const queryParams = new URLSearchParams(params);
    const requestUrl = `${apiUrl}?${queryParams}`;

    const response = await fetch(requestUrl);

    if (response.status !== 200) {
      throw new Error(`API request failed with status ${response.status}`);
      return interaction.editReply('We Are Having Trouble With The Api, Please Try Again.');
    }

    const data = await response.json();


    return interaction.editReply(data.response);
  },
};
