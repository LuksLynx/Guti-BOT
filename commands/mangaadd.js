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
        try { // valida se o manga existe ou não
            await (MFA.Manga.get(mangaId));
        } catch (error) {
            console.log(error);
            return message.channel.send('Algo deu errado, procure algum especialista!');
        }
        let manga = await (MFA.Manga.get(mangaId));

        let lastChapter = await manga.getFeed({
            order: { volume: "desc", chapter: "desc" },
            limit: 1
        }).then(chapter => chapter.shift().chapter);

        /*console.log(guildId);
        console.log(channelId);
        console.log(mangaId[0]);
        console.log(lastChapter);*/

        await database.query(`INSERT INTO GGManga (GGGuildID, GGMUid, GGMLastChapter, GGMChannel) VALUES ('${guildId}', '${mangaId[0]}', '${lastChapter}', '${channelId}')`);
        message.channel.send(`**${manga.title}** adicionado com sucesso!`);

    }
}