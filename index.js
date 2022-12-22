const Discord = require("discord.js")
const dotenv = require("dotenv")
const commandLoader = require('./commandLoader')
// const Timeout = new Discord.Collection()
// const Duration = require('humanize-duration');
const keepAlive = require("./server")
const chalk = require('chalk')
const moment = require('moment')

const { Client, Events, EmbedBuilder, ChannelType, ThreadAutoArchiveDuration, GatewayIntentBits, Partials } = require("discord.js")
const eventHandler = require("./events")

dotenv.config()

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions
  ],
  partials: [
    Partials.Message, 
    Partials.Channel, 
    Partials.Reaction
  ],
})

commandLoader.start(client)

client.on("ready", () => {
  client.user.setPresence({
    activities: [{ name: `Connect`, type: Discord.ActivityType.Playing }],
    status: 'online', 
  });

  console.log(`Logged in as ${client.user.tag}`)

  eventHandler(client)
})

// client.on('guildMemberUpdate', (oldMember, newMember) => {

//   const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
// 	if (removedRoles.size > 0) {
// 		console.log(`The roles ${removedRoles.map(r => r.name)} were removed from ${oldMember.displayName}.`);
// 	}

// 	// If the role(s) are present on the new member object but are not on the old one (i.e role(s) were added)
// 	const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
// 	if (addedRoles.size > 0) {
// 		console.log(`The roles ${addedRoles.map(r => r.name)} were added to ${oldMember.displayName}.`);
// 	}

// })

// catches message commands
client.on('messageCreate', async (message) => {
  if (message.author.bot) return

  const prefix = ","
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  const cmd = client.commands.find((c) => c.data.name === command || c.data.alias && c.data.alias.includes(command))

  if (cmd){
   cmd.run(client, message, args)
  }
  //if (message.channel instanceof Discord.GuildChannel) await message.delete().catch(err => console.log(err));
})

//catches slash commands
client.on("interactionCreate", (interaction) => {
  async function handleCommand() {
    if (!interaction.isChatInputCommand()) return

    const slashcmd = client.slashcommands.get(interaction.commandName)
    if (!slashcmd) interaction.reply({ content: "Not a valid command", ephemeral: true })

    //await interaction.deferReply()
    if (slashcmd) await slashcmd.run({ client, interaction })
  }
  handleCommand()
})



// client.on('threadCreate', async (thread) => {
//   // if(thread.parentId == 1053121174072201216) await thread.send(`<@&1038779597686309034>`)
//     // if (thread.type == ChannelType.PublicThread) {
//     //    await thread.send(`<@&1038779597686309034>`)    
//     //     // When a new forum post is created
//     //     console.log(thread.parentId) // The forum channel ID
//     //     console.log(thread.id) // The forum post ID
//     //     console.log(thread.name) // The name of the forum post
//     // }
// })

client.on(Events.MessageReactionAdd, async (reaction, user) => {
  //console.log(reaction.partial)
  
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('ERROR fetching reaction message', error);
			return;
		}
	}

  console.log(reaction)
  /*
	// Now the message has been cached and is fully available
	console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
	// The reaction is now also fully available and the properties will be reflected accurately:
	console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
  */
});

/*  console.log(reactions)

  let cacheChannel = message.guild.channels.cache.get('1054899373844205628');
  const test = await cacheChannel.messages.fetch('1055087181171019846').reactions
  console.log(test)
  if(cacheChannel){
    cacheChannel.messages.fetch('1055087181171019846').then(reactionMessage => {                
        reactionMessage.reactions.cache.map(async function(reaction){
            reaction.fetch().then(r => {
                 r.users.cache.map(item => {
                    if(!item.bot) console.log(item.id);                         
                })                        
            })  
        });                                  
    });          
  } */

keepAlive();
client.login(process.env.TOKEN)