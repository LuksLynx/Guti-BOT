const MFA = require('mangadex-full-api');
const { database } = require("../index.js");
const Urlregex = new RegExp('^(https:\/\/mangadex\.org\/title\/[A-Za-z0-9-]+\/[A-Za-z0-9-]+)$');

module.exports = {
    name: 'mangadel',
    description: 'remove mangas para receber notificação de novos capítulos no servidor',
    async execute(message, args) {

        if (!Urlregex.test(args[0])) return message.channel.send('URL inválido');

        let guildId = message.guild.id;
        let mangaId = args[0].split('/', 5).slice(4);

        try {
            var manga = await (MFA.Manga.get(mangaId));
        } catch (error) {

            if (error.code === 2)
                return message.channel.send('A URL não foi encontrada. Digite ela corretamente.');
            else if (error.code === 3)
                return message.channel.send('A API do MangaDex está com algum problema. Aguarde alguns momentos e tente novamente.');

            return message.channel.send('Algo deu errado, procure algum especialista!');

        };

        let hasManga = await database.query(`SELECT GGMStatus FROM GGManga WHERE GGGuildID = '${guildId}' AND GGMUid = '${mangaId[0]}'`);

        if (!hasManga || hasManga.GGMStatus == 0) {

            return message.channel.send(`**${manga.title}** NÃO está ativo no servidor!`);

        } else if (hasManga.GGMStatus == 1) {

            await database.query(`UPDATE GGManga SET GGMStatus = 0 WHERE GGGuildID = '${guildId}' AND GGMUid = '${mangaId}'`);
            return message.channel.send(`**${manga.title}** removido com sucesso!`);

        }
    }
}