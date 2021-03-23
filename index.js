require('dotenv').config();

const fs = require('fs');
const Discord = require('discord.js');
const utils = require('./utils.js');

const prefix = '%'; //prefixo do bot
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  client.user.setActivity('com o silvinha | %help');
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {

  /* Passiva do Guti */

  let mensagens = ['Eu sou Guti', 'Guti?', 'Gay', 'Anthonny?'];
  let random = await utils.random(0, mensagens.length);

  if (message.content.includes('<@!231632637045768192>')) {
    message.channel.send(mensagens[random]);
  }

  /* Fim da passiva */

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(client.commands.get(command) != undefined) {
      client.commands.get(command).execute(message, args);
  } else {
    message.channel.send('DIGITA CERTO SEU GORILA');
  }

});

client.login(process.env.BOT_TOKEN);