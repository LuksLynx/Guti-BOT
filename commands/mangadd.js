const MFA = require('mangadex-full-api');
const { database } = require("../index.js");
const Urlregex = new RegExp('^(https:\/\/mangadex\.org\/title\/[A-Za-z0-9-]+\/[A-Za-z0-9-]+)$');

module.exports = {
    name: 'mangadd',
    description: 'adiciona mangas para receber notificação de novos capítulos no servidor',
    async execute(message, args) {

        if (!Urlregex.test(args[0])) return message.reply('URL inválido');

        let guildId = message.guild.id;
        let channelId = message.channel.id;
        let mangaId = args[0].split('/', 5).slice(4);

        try {
            var manga = await (MFA.Manga.get(mangaId));
        } catch (error) {

            if (error.code === 2)
                return message.reply('A URL não foi encontrada. Digite ela corretamente.');
            else if (error.code === 3)
                return message.reply('A API do MangaDex está com algum problema. Aguarde alguns momentos e tente novamente.');

            return message.reply('Algo deu errado, procure algum especialista!');

        };

        let lastChapter = await manga.getFeed({
            order: { volume: "desc", chapter: "desc" },
            limit: 1
        }).then(chapter => chapter.shift().chapter);

        let hasManga = await database.query(`SELECT GGMStatus FROM GGManga WHERE GGGuildID = '${guildId}' AND GGMUid = '${mangaId[0]}'`);

        if (!hasManga) {

		await database.query(`
			INSERT INTO GGManga (GGGuildID, GGMUid, GGMLastChapter, GGMChannel)
				VALUES
			('${guildId}', '${mangaId[0]}', '${lastChapter}', '${channelId}')
		`);

		return message.reply(`**${manga.title}** adicionado com sucesso!`);

        } else if (hasManga.GGMStatus == 1) {

		return message.reply(`**${manga.title}** já está ativo no servidor!`);

        } else if (hasManga.GGMStatus == 0) {

		await database.query(`UPDATE GGManga SET GGMStatus = 1 WHERE GGGuildID = '${guildId}' AND GGMUid = '${mangaId}'`);
		await database.query(`UPDATE GGManga SET GGMChannel = ${channelId} WHERE GGGuildID = '${guildId}' AND GGMUid = '${mangaId}'`);
		
		return message.reply(`**${manga.title}** foi reativado no servidor!`);
		
        }
    }
}