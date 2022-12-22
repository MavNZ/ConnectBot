const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('raid')
    .setDescription('Send tweet to raid')
    .addStringOption(option =>
		option.setName('reward')
			.setDescription('The amount to be rewarded')
            .setRequired(true))    
	.addChannelOption(option =>
		option.setName('channel')
			.setDescription('The channel to send the raid')
            .setRequired(true))
    .addStringOption(option =>
		option.setName('tweetlink')
			.setDescription('Copy the Tweet link')
            .setRequired(true)),
    // .addStringOption(option =>
	// 	option.setName('bonus')
	// 		.setDescription('Bonus reward for adding text in the Tweet')
    //         .setRequired(true)),
    run: async ({ client, interaction }) => {
      //console.log(interaction.options._hoistedOptions)
      const reward = interaction.options._hoistedOptions[0].value
      const channel = interaction.options._hoistedOptions[1].value
      const tweetlink = interaction.options._hoistedOptions[2].value
      //const bonus = interaction.options._hoistedOptions[3].value 

      const raidEmbed = new EmbedBuilder()
      .setColor(0xBFF5A1)
      .setTitle("Twitter Rewards")
      .setDescription(`**LIKE, RETWEET** and **COMMENT** the tweet linked below.\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯`)
      .addFields(
          { name: "**• Tweet Link **", value: `🔗 [Go to Tweet](${tweetlink})`, inline: true},
          { name: "**• Reward**", value: `${reward} $WOOD`, inline: true},
          //{ name: "**• Required text in tweet**", value: `${bonus}`, inline: true}
      )

      const button = new ButtonBuilder()
	  .setCustomId('like')
	  .setLabel('Claim Like')
	  .setStyle(ButtonStyle.Danger)
      .setEmoji(':lk:1055291295045787718')
      const button2 = new ButtonBuilder()
	  .setCustomId('retweet')
	  .setLabel('Claim Retweet')
	  .setStyle(ButtonStyle.Success)
      .setEmoji(':rt:1055291296425717761')
      const button3 = new ButtonBuilder()
	  .setCustomId('comment')
	  .setLabel('Claim Comment')
	  .setStyle(ButtonStyle.Primary)
      .setEmoji(':cmt:1055291293477122068')

      const row = new ActionRowBuilder().addComponents(button, button2, button3)

      await interaction.reply({ content: "what's up Dawg!", ephemeral: true })

      await interaction.guild.channels.cache.get(`${channel}`).send({ embeds: [raidEmbed], components: [row] })
      
    },
};