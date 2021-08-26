const MFA = require('mangadex-full-api');
const { database } = require("../index.js");
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'manga',
    description: 'mostra mangas para receber notificação de novos capítulos no servidor',
    async execute(message, args) {

        let mangasId = await database.query(`SELECT GGMUid FROM GGManga WHERE GGGuildID = '${message.guild.id}' AND GGMStatus = 1`, true);
        if (!mangasId) return message.channel.send('Não há notificações de mangas ativas nesse servidor...');

        let mangas = [];

        for(const mangaId of mangasId) {
            let manga = await MFA.Manga.get(mangaId.GGMUid);
            let mangaUrl = `https://mangadex.org/title/${mangaId.GGMUid}`
            let mangaTitle = manga.title;
            mangas.push({
                url: mangaUrl,
                title: mangaTitle
            });
        };

        const embed = new MessageEmbed()
            .setTitle('MANGAS ATIVOS NO SERVIDOR')
            .setDescription(mangas.map((manga, index) => `**${index+1}** - [${manga.title}](${manga.url})`).join("\n"));

        return message.channel.send(embed);
    }
}