const { MessageEmbed } = require('discord.js');
const reactEmojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣'];

module.exports = {
	name: 'poll',
	description: 'cria uma enquete',
	async execute(message, args) {

		let mensagem = args.join(' ').split('/', 5);

		if (mensagem.some(element => element == ''))
			return message.reply('Não deixe coisas vazias >:(');
		if (mensagem.length < 3)
			return message.reply('É preciso pelo menos 2 alternativas');

		let poll = mensagem[0];
		let options = [];

		mensagem.shift();
		mensagem.forEach((item, idx) => { options.push(`${reactEmojis[idx]} **${item.toUpperCase()}**`) });

		const pollEmbed = new MessageEmbed()
			.setColor('#0000FF')
			.setTitle(poll.toUpperCase())
			.setAuthor(`📊 ${message.author.tag} iniciou uma votação: `)
			.setFooter('A votação dura 1 minuto')
			.setDescription(options.join("\n"));

		const embedMessage = await message.channel.send({ embeds: [pollEmbed] });

		options.forEach(async (item, idx) => await embedMessage.react(String(reactEmojis[idx])));

		const filter = (reaction, user) => reactEmojis.includes(reaction.emoji.name) && user.id != embedMessage.author.id;
		const collector = embedMessage.createReactionCollector(filter, { time: 60000 });

		let userReaction = [];
		var count = [];

		collector.on('collect', (reaction, user) => {

			embedMessage.reactions.cache.forEach((reactionManager, emoji) => {
				if (emoji != reaction.emoji.name && reactionManager.users.cache.has(user.id))
					reactionManager.users.remove(user.id);
			});

			userReaction[user.id] = reaction.emoji.name;
		});

		collector.on('end', collected => {

			options.forEach((item, idx) => {
				count[String(reactEmojis[idx])] = Object.values(userReaction).filter(emoji => emoji == reactEmojis[idx]).length;
			});

			const embedDescription = Object.keys(count).map((emoji, idx) => [options[idx], count[emoji] + " votos**"].join(" **: ")).join("\n");

			const resultsEmbed = new MessageEmbed()
				.setColor('#0000FF')
				.setTitle(poll.toUpperCase())
				.setAuthor(`📊 Resultado da votação de ${message.author.tag}`)
				.setDescription(embedDescription);

			return message.channel.send(({ embeds: [resultsEmbed] }));

		});
	}
}