const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const fetch = require('@replit/node-fetch')

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("waifu")
    .setDescription("Search for your waifu.")
    .addStringOption(option =>
			option.setName('tags')
				.setDescription('Select your tags!')
				.setRequired(true)
				.addChoices(
					{ name: 'Waifu', value: 'waifu' },
					{ name: 'Maid', value: 'maid' },
					{ name: 'Marin Kitagawa', value: 'marin-kitagawa' },
					{ name: 'Mori Calliope', value: 'mori-calliope' },
					{ name: 'Raiden Shogun', value: 'raiden-shogun' },
					{ name: 'Oppai', value: 'oppai' },        
					{ name: 'Selfies', value: 'selfies' },
					{ name: 'Uniform', value: 'uniform' },
				)),
  async execute(interaction) {
    
    const tag = interaction.options.getString('tags');

    const sent = await interaction.deferReply({ fetchReply: true });

    const apiUrl = 'https://api.waifu.im/search';
    const params = {
      included_tags: tag,
      height: '>=2000'
    };
    
    const queryParams = new URLSearchParams(params);
    const requestUrl = `${apiUrl}?${queryParams}`;
    
    const response = await fetch(requestUrl);
    
    const data = await response.json();

    console.log(data);
    return interaction.editReply(data.images[0].url);
  },
};

