const fetch = require('node-fetch');

exports.random = async (min, max) => {
	return min + Math.floor((max - min) * Math.random());
}

exports.passivaGutao = async (message) => {
	let mensagens = ['EU SOU O VERDADEIRO GUTI PORRA', 'VAI GANHA TATUAGEM DE SEREIA', 'MÃO NA CABEÇA', 'SAI DAQUI IMPOSTOR DE BOSTA', 'HEITOR FAZ ALGUMA COISA TIRA ESSE IMPOSTOR DO SERVIDOR', 'HEITOR PORRA, FAZ ALGUMA COISA... MOSTRA QUEM MANDA NESSA PORRA'];
	let msgRandom = await this.random(0, mensagens.length);
	let chamaGuti = await this.random(1, 100);

	if (message.content.includes('<@!231632637045768192>')) {
		if (chamaGuti <= 10) {
			message.channel.send(mensagens[msgRandom]);
		}
	}
}

exports.badWordsDetector = (content) => {
	const badWords = ['cp', 'child', 'loli', 'lolicon', 'lolita', 'shotacon', 'shota', 'kid', 'kiddo', 'kids', 'lolis', 'kiddy', 'children', 'baby', 'babies', 'jb', 'jailbait', 'lollipop', 'cub', 'toddlercon', 'toddler', 'teen'];
	if (badWords.some(badWord => content.includes(badWord))) {
		return true;
	}
}

exports.mangadex = async (database, client, Discord, MFA) => {
	let activeMangas = await database.query('SELECT * FROM GGManga WHERE GGMStatus = 1', true);

	activeMangas.forEach(async element => {

		let guildObj = await client.guilds.fetch(element.GGGuildID);

		let mangaChannel = await guildObj.channels.fetch(element.GGMChannel);

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

			mangaChannel.send({ embeds: [mangaEmbed] });
		}
	});
}