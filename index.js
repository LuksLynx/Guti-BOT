require('dotenv').config();
const database = require('./database.js');
exports.database = database;
const fs = require('fs');

const Discord = require('discord.js');
const utils = require('./utils');
const MFA = require('mangadex-full-api');
const cron = require('node-cron');
const BOT_TOKEN = process.env.BOT_TOKEN;

const client = new Discord.Client({
	intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.GUILD_MESSAGES,
		Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	]
});

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', client => {
	client.user.setActivity('%help | gutiprefix');
	console.log(`Logged in as ${client.user.tag}`);
});

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

client.on('messageCreate', async (message) => {

	await utils.passivaGutao(message);

	var prefix = await database.query(`SELECT GGPrefix FROM GGuild WHERE GGGuildID = ${message.guild.id}`);
	prefix = prefix.GGPrefix;

	if (message.content == 'gutiprefix') return message.reply(`O prefixo do Guti é ${prefix}`);

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (client.commands.get(command) != undefined) {
		client.commands.get(command).execute(message, args);
	};
});

cron.schedule("*/1 * * * *", () => {utils.mangadex(database,client,Discord,MFA)});

client.login(BOT_TOKEN);