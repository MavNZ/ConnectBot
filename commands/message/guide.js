const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')

const embed = new EmbedBuilder()
.setColor(0x2f3136)
.setTitle("How do I get access to #TheRenaissance?")
.setDescription(`**You have 3 choices:**
\n<:1:1055238153897771018> **Buy a Capsule on MagicEden**
These range from multiple free mints to whitelist only Capsules, for more info check out /tiers_info
\n<:2:1055238156410167346> **Wait for your connect application to be approved**
This may take some time and is not guaranteed.
\n<:3:1055238157714591775> **Help build the Mindfolk narrative**
Connect with the community and become part of #TheRenaissance journey. This route inspires you to engage with us and earn $WOOD along the way. Your first step is to connect your twitter and follow the instructions in both #Wood-avenue and #Mf-rewards - the rest is easy.
\n*P.s. 10k $WOOD gets you Whitelist (FCFS) and every week we’ll be dropping 10 presale Capsules on the top 10 choppers.*`)

module.exports = {
    data: {
      name: "guide",
      aliases: ['guide'],
      description: "Basic Info",
    },
    run: async (client, message, args) => {
    await message.delete()
    await message.channel.send({ embeds: [embed]})

    }
}