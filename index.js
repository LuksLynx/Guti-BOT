require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const utils = require('./utils.js');

client.on('ready', () => {
  client.user.setActivity('com o silvinha | %help');
  console.log(`Logged in as ${client.user.tag}!`);
});

const prefix = '%'; //prefixo do bot

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.on('message', message => {          // onde os comandos ficam
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/); // split separa as palavras separadas por espaço
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    client.commands.get('ping').execute(message, args);
  } else if (command === 'help') {
    client.commands.get('help').execute(message, args, Discord);
  } else if (command === 'clear') {
    client.commands.get('clear').execute(message, args);
  } else if (command === 'play') {
    client.commands.get('play').execute(message, args);
  } else if (command === 'roll') {
    client.commands.get('roll').execute(message, args);
  } else {
    message.channel.send('DIGITA CERTO SEU GORILA')
  }
});

client.on('message', async (msg) => {

  let mensagens = [
    'Eu sou Guti', 'Guti?', 'Gay', 'Anthonny?'
  ];
  let random = await utils.random(0, mensagens.length);

  if (msg.content.includes('<@!231632637045768192>')) {
    msg.channel.send(mensagens[random]);
  }

});

client.login(process.env.BOT_TOKEN);
