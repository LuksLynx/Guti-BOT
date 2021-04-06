require('dotenv').config();
const database = require('./database.js');

const fs = require('fs');
const Discord = require('discord.js');
const utils = require('./utils.js');

const prefix = process.env.BOT_PREFIX;
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
  /*DATABASE*/
client.on('guildCreate', async guild => {
    await database.query(`INSERT INTO GGuild (GGGuildID, GGname) VALUES (${guild.id}, '${guild.name}')`);
});

client.on('guildDelete', async guild => {
    const dbId = await database.query(`SELECT GGuildID FROM GGuild WHERE GGGuildID = ${guild.id}`);
    await database.query(`DELETE FROM GGuild WHERE GGuildID = ${dbId.GGuildID}`);
});
  /*DATABASE END*/
client.on('ready', () => {
  client.user.setActivity('com o silvinha | %help');
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {

  /* Passiva do Guti */

  let mensagens = ['EU SOU O VERDADEIRO GUTI PORRA','VAI GANHA TATUAGEM DE SEREIA','MÃO NA CABEÇA','SAI DAQUI IMPOSTOR DE BOSTA','HEITOR FAZ ALGUMA COISA TIRA ESSE IMPOSTOR DO SERVIDOR','HEITOR PORRA, FAZ ALGUMA COISA... MOSTRA QUEM MANDA NESSA PORRA'];
  let random = await utils.random(0, mensagens.length);
  let chamaGuti = await utils.random(1, 100);
  

  if (message.content.includes('<@!231632637045768192>')) {
    if (chamaGuti <= 10) {
      message.channel.send(mensagens[random]);
    }
  }

  /* Fim da passiva */

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (client.commands.get(command) != undefined) {
    client.commands.get(command).execute(message, args);
  } else {
    message.channel.send('DIGITA CERTO SEU GORILA');
  }

});

client.login(process.env.BOT_TOKEN);