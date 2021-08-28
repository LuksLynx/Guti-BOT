require('dotenv').config();

const { Client, Intents } = require('discord.js');
const BOT_TOKEN = process.env.BOT_TOKEN;

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	]
});

client.once('ready', client => {
	console.log(`Ready at ${client.readyAt}`);
});

client.login(BOT_TOKEN);