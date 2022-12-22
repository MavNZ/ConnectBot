const { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
//const moment = require('moment')
const dotenv = require('dotenv')
dotenv.config()

const downpage = "https://cdn.discordapp.com/attachments/1034106468800135168/1041668169426817044/downpage_1.png"

const userAns = []
const userCount =[]

const { Client } = require("twitter-api-sdk");

const fs = require('fs')

async function twitterLikeAndRetweet(twitter_user,tweet_id) {
  const proof = []
  const client = new Client(process.env.BEARER_TOKEN);

  const responseRT = await client.users.tweetsIdRetweetingUsers(tweet_id);
  const responseLike = await client.users.tweetsIdLikingUsers(tweet_id);
  
  const dataRT = responseRT.meta.result_count == 0 ? '' : JSON.parse(JSON.stringify(responseRT.data, null, 2))
  const dataLike = JSON.parse(JSON.stringify(responseLike.data, null, 2))

  let resultRT = dataRT.length !== 0 ? dataRT.find((name) => name.username == twitter_user) : ""
  let resultLike = dataLike.find((name) => name.username == twitter_user) || ""

  if (resultLike.length !== 0) proof.push(resultLike)
  if (dataRT.length !== 0) proof.push(resultRT)

  const actionProof = Object.keys(proof).length
  return actionProof
  // if(actionProof !== 2){
  //   return console.log("You are missing the requirements Charlie")
  // } else {
  //   console.log("congratulations!")
  // }
}

const bonus = "awesome"

async function twitterComment(twitter_user, tweet_user) {
    const proof = []
    const client = new Client(BEARER_TOKEN);
  
    const resComment = await client.tweets.tweetsRecentSearch({
      "query": `from:${twitter_user} is:reply`
    });
    
    const dataComment = await JSON.parse(JSON.stringify(resComment.data, null, 2))
    let resultComment = await dataComment.find((tweet) => tweet.text)

    if(resultComment.text.search(`@${tweet_user}`) !== -1) {
      proof.push("Comment verified")
      if(resultComment.text.includes(bonus)) proof.push("Bonus matching word")
    }
    const actionProof = proof.length
    console.log(proof)

    if(actionProof === 0) return console.log("Sorry no matches")
    if(actionProof === 1) return console.log("Comment verified")
    if(actionProof === 2) return console.log("Bonus + Comment")
    return
    //console.log("response", JSON.stringify(resultComment, null, 2));
}
    
//twitterComment("Kirtan_108", "Jurgens")


const eventHandler = async ( client ) => {
  client.on(Events.InteractionCreate, async (interaction) => {
      if (interaction.isChatInputCommand()) return

      const member = interaction.guild.members.cache.get(interaction.user.id)
      //const role = interaction.guild.roles
      const vrole = interaction.guild.roles.cache.get(process.env.V_ROLE)

      if (interaction.customId === 'getinfo'){
        //let channel = client.channels.cache.get('1054362497349586974')
        const info = interaction.user
        //console.log(info)
        const dId = interaction.user.id

        const eConnect = new EmbedBuilder()
        .setTitle("Succesfully Linked")
        .setDescription(`Please follow the steps in our [Connect App](https://incandescent-hamster-a58525.netlify.app/link?discordId=${dId})`)

        const button = new ButtonBuilder()
        .setURL(`https://connect.mindfolk.art/login?discordId=${dId}`)
        .setLabel('Connect App')
        .setStyle('Link')
        const row = new ActionRowBuilder().addComponents(button)
        await interaction.reply({ embeds: [eConnect], ephemeral: true, components: [row] })
        const iJ = JSON.stringify(info, null, 2)
        const B = "```"
        
        await interaction.channel.send({ content: `${B}${iJ}${B}` })
      }

      if(interaction.cudtomId === 'comment'){
        // Here I will get the twitter_user with discordID and looking to their twitter user in a database. 
        // Problem is how to get the the tweet_id
        twitterLikeAndRetweet(twitter_user, tweet_id)
        return
      }

  })
}

module.exports = eventHandler