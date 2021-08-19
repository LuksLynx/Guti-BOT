const MFA = require('mangadex-full-api');
const { database } = require("../index.js");
const Urlregex = new RegExp('^(https:\/\/mangadex\.org\/title\/[A-Za-z0-9-]+)$');

module.exports = {
    name: 'mangaadd',
    description: 'adiciona mangas para receber notificação de novos capítulos no servidor',
    async execute(message, args) {

        if (!Urlregex.test(args[0])) return message.channel.send('URL inválido');
        
		let guildId = message.guild.id;
        let channelId = message.channel.id;
        let mangaId = args[0].split('title/', 2).slice(1);
        
		try {
            var manga = await (MFA.Manga.get(mangaId));
        } catch (error) {
			
			if(error.code===2)
				return message.channel.send('A URL não foi encontrada. Digite ela corretamente.');
			else if(error.code===3)
				return message.channel.send('A API do MangaDex está com algum problema. Aguarde alguns momentos e tente novamente.');
            
			return message.channel.send('Algo deu errado, procure algum especialista!');

        }

		let lastChapter = await manga.getFeed({
            order: { volume: "desc", chapter: "desc" },
            limit: 1
        }).then(chapter => chapter.shift().chapter);

        await database.query(`
			INSERT INTO GGManga (GGGuildID, GGMUid, GGMLastChapter, GGMChannel)
				VALUES
			('${guildId}', '${mangaId[0]}', '${lastChapter}', '${channelId}')
		`);

        message.channel.send(`**${manga.title}** adicionado com sucesso!`);

    }
}