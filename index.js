require('dotenv').config();
const database = require('./database.js');
exports.database = database;
const cron = require('node-cron');

const fs = require('fs');
const Discord = require('discord.js');
const MFA = require('mangadex-full-api');
const utils = require('./utils.js');
const fetch = require('node-fetch');

const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

/*DATABASE*/
client.on('guildCreate', async guild => {
  const guildId = await database.query(`SELECT GGuildID FROM GGuild WHERE GGGuildID = ${guild.id}`);
  if (!guildId) {
    await database.query(`INSERT INTO GGuild (GGGuildID, GGname) VALUES (${guild.id}, '${guild.name}')`);
  } else {
    await database.query(`UPDATE GGuild SET GGStatus = 1 WHERE GGuildID = ${guildId.GGuildID}`);
  }

});

client.on('guildDelete', async guild => {
  const dbId = await database.query(`SELECT GGuildID FROM GGuild WHERE GGGuildID = ${guild.id}`);
  await database.query(`UPDATE GGuild SET GGStatus = 0 WHERE GGuildID = ${dbId.GGuildID}`);
});
/*DATABASE END*/

client.on('ready', () => {
  client.user.setActivity('%help | gutiprefix');
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {

  /* Passiva do Guti */

  let mensagens = ['EU SOU O VERDADEIRO GUTI PORRA', 'VAI GANHA TATUAGEM DE SEREIA', 'MÃO NA CABEÇA', 'SAI DAQUI IMPOSTOR DE BOSTA', 'HEITOR FAZ ALGUMA COISA TIRA ESSE IMPOSTOR DO SERVIDOR', 'HEITOR PORRA, FAZ ALGUMA COISA... MOSTRA QUEM MANDA NESSA PORRA'];
  let random = await utils.random(0, mensagens.length);
  let chamaGuti = await utils.random(1, 100);


  if (message.content.includes('<@!231632637045768192>')) {
    if (chamaGuti <= 10) {
      message.channel.send(mensagens[random]);
    }
  }

  /* Fim da passiva */

  var prefix = await database.query(`SELECT GGPrefix FROM GGuild WHERE GGGuildID = ${message.guild.id}`);
  prefix = prefix.GGPrefix;

  if (message.content == 'gutiprefix') return message.channel.send(`O prefixo do Guti é ${prefix}`);

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (client.commands.get(command) != undefined) {
    client.commands.get(command).execute(message, args);
  } else {
    message.channel.send('DIGITA CERTO SEU GORILA');
  }

});

/* CRON DO MANGADEX */
const mangadex = async () => {

  let activeMangas = await database.query('SELECT * FROM GGManga WHERE GGMStatus = 1', true);

  activeMangas.forEach(async element => {

    let guildObj = client.guilds.cache.get(element.GGGuildID);
    let mangaChannel = guildObj.channels.cache.get(element.GGMChannel);

    let thisManga = await MFA.Manga.get(element.GGMUid);

    let mangaCoverResponse = await fetch(`https://api.mangadex.org/cover/${thisManga.mainCover.id}`).then(res => res.json());
    let chapter = await thisManga.getFeed({ order: { volume: "desc", chapter: "desc" }, limit: 1 }).then(chapter => chapter.shift());

    let currentChapter = chapter.chapter;
    let currentChapterUrl = `https://mangadex.org/chapter/${chapter.id}`;
    let mangaCover = `https://uploads.mangadex.org/covers/${thisManga.id}/${mangaCoverResponse.data.attributes.fileName}`;

    if (currentChapter != element.GGMLastChapter) {
      await database.query(`UPDATE GGManga SET GGMLastChapter = '${currentChapter}' WHERE GGGuildID = '${element.GGGuildID}' AND GGMUid = '${element.GGMUid}'`);

      const mangaEmbed = new Discord.MessageEmbed()
        .setColor('#a600ff')
        .setTitle(`${thisManga.title} - ${currentChapter}`)
        .setURL(currentChapterUrl)
        .setDescription('CAPÍTULO NOVO DISPONÍVEL')
        .setThumbnail('https://cdn.discordapp.com/attachments/514299610366345216/879828658011910194/xbt_jW78_400x400.jpg')
        .setImage(mangaCover);

      mangaChannel.send(mangaEmbed);
    }
  });
}
/* FIM DO CRON */

cron.schedule("* */24 * * *", mangadex);

client.login(process.env.BOT_TOKEN);