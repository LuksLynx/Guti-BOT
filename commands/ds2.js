const Discord = require("discord.js");
const ytdl = require('discord-ytdl-core');
const Play = require("./play.js");
const StringSimilarity = require('string-similarity');

module.exports = {
    name: 'ds2',
    description: 'toca o soundtrack de um boss de dark sousl 2 disponivel',
    async execute(message, args) {

        const bossArray1 = [
            { nome: '**1 - The Last Giant; Giant Lord**', url: 'https://www.youtube.com/watch?v=3Wf4bg4AVNM' },
            { nome: '**2 - The Pursuer**', url: 'https://www.youtube.com/watch?v=ds9rDSA0Mz4' },
            { nome: '**3 - Executioners Chariot**', url: 'https://www.youtube.com/watch?v=m3CTxI_zbeU' },
            { nome: '**4 - Looking Glass Knight**', url: 'https://www.youtube.com/watch?v=fQe6G9wkBwg' },
            { nome: '**5 - The Skeleton Lords**', url: 'https://www.youtube.com/watch?v=LZBlhNOWlTY' },
            { nome: '**6 - Flexile Sentry**', url: 'https://www.youtube.com/watch?v=uTUeLbDehOU' },
            { nome: '**7 - Lost Sinner**', url: 'https://www.youtube.com/watch?v=zB2CUPPWhr4' },
            { nome: '**8 - Belfry Gargoyles**', url: 'https://www.youtube.com/watch?v=AqNpq0BgZBU' },
            { nome: '**9 - Ruin Sentinels; Smelter Demons**', url: 'https://www.youtube.com/watch?v=mz1_3az6Hgs' },
            { nome: '**10 - Royal Rat Vanguard**', url: 'https://www.youtube.com/watch?v=Uaj15mYOoVI' },
            { nome: '**11 - Royal Rat Authority**', url: 'https://www.youtube.com/watch?v=iSbjIFx4Hxg' },
            { nome: '**12 - Scorpioness Najka; Prowling Magus and Congregation**', url: 'https://www.youtube.com/watch?v=kvnqQRZAGH0' },
            { nome: '**13 - The Dukes Dear Freja**', url: 'https://www.youtube.com/watch?v=nn8VM9c6RcM' },
            { nome: '**14 - Mytha, the Baneful Queen**', url: 'https://www.youtube.com/watch?v=zqeH9cAKvIY' },
            { nome: '**15 - The Rotten**', url: 'https://www.youtube.com/watch?v=u04gmzXTIMU' },
            { nome: '**16 - Old Dragonslayer**', url: 'https://www.youtube.com/watch?v=NFrcmJQencc' },
            { nome: '**17 - Covetous Demon**', url: 'https://www.youtube.com/watch?v=ZvSbAVBVBqU' },
            { nome: '**18 - Old Iron King**', url: 'https://www.youtube.com/watch?v=iUZyJHDasqA' }
        ];
        const bossArray2 = [
            { nome: '**19 - Guardian Dragon**', url: 'https://www.youtube.com/watch?v=Fd8Qqg6srCQ' },
            { nome: '**20 - Demon of Song**', url: 'https://www.youtube.com/watch?v=UvhYptd-yzU' },
            { nome: '**21 - Velstadt, The Royal Aegis**', url: 'https://www.youtube.com/watch?v=Em5gtDJcFqM' },
            { nome: '**22 - Vendrick**', url: 'https://www.youtube.com/watch?v=nnoZG6iCbjU' },
            { nome: '**23 - Darklurker**', url: 'https://www.youtube.com/watch?v=g9wEYvgQjSk' },
            { nome: '**24 - Dragonrider; Twin Dragonriders**', url: 'https://www.youtube.com/watch?v=7NRB8CdfHBU' },
            { nome: '**25 - Ancient Dragon**', url: 'https://www.youtube.com/watch?v=uCjlcO3fL3w' },
            { nome: '**26 - Throne Watcher and Throne Defender**', url: 'https://www.youtube.com/watch?v=1n4EavKs1K4' },
            { nome: '**27 - Nashandra**', url: 'https://www.youtube.com/watch?v=efHjdSM3nHo' },
            { nome: '**28 - Aldia, Scholar of the First Sin**', url: 'https://www.youtube.com/watch?v=Ub-bg-rmEF4' },
            { nome: '**29 - Elana, Squalid Queen**', url: 'https://www.youtube.com/watch?v=ckGyYWowMgc' },
            { nome: '**30 - Sinh, the Slumbering Dragon**', url: 'https://www.youtube.com/watch?v=vAVCkVclNR4' },
            { nome: '**31 - Afflicted Graverobber, Ancient Soldier Varg, and Cerah the Old Explorer**', url: 'https://www.youtube.com/watch?v=tNhqsri8Mdc' },
            { nome: '**32 - Fume Knight**', url: 'https://www.youtube.com/watch?v=ig0G32Ng2lM' },
            { nome: '**33 - Sir Alonne**', url: 'https://www.youtube.com/watch?v=IIy65yuf3Mo' },
            { nome: '**34 - Burnt Ivory King**', url: 'https://www.youtube.com/watch?v=alTQiC6hhGc' },
            { nome: '**35 - Aava, the Kings Pet**', url: 'https://www.youtube.com/watch?v=Lf5Ymjn3z4w' },
            { nome: '**36 - Lud and Zallen, the Kings Pets**', url: 'https://www.youtube.com/watch?v=iTmlU7K21cE' }
        ];

        let bossUrl;

        if (!args || args == '') {

            const page1Embed = new Discord.MessageEmbed()
                .setColor('#ff0229')
                .setThumbnail('https://cdn.discordapp.com/attachments/541793377373650984/857362189287030794/dark_souls_ii___scholar_of_the_first_sin_icon_v2_by_andonovmarko_d8o6yty.png')
                .setTitle('ESCOLHA SEU BOSS DE DARK SOULS 2')
                .setFooter('45 segundos para escolher')
                .setDescription(bossArray1.map((i) => i.nome).join("\n"));

            const page2Embed = new Discord.MessageEmbed()
                .setColor('#ff0229')
                .setThumbnail('https://cdn.discordapp.com/attachments/541793377373650984/857362189287030794/dark_souls_ii___scholar_of_the_first_sin_icon_v2_by_andonovmarko_d8o6yty.png')
                .setTitle('ESCOLHA SEU BOSS DE DARK SOULS 2')
                .setFooter('45 segundos para escolher')
                .setDescription(bossArray2.map((i) => i.nome).join("\n"));


            const embedMessage = await message.channel.send(page1Embed);
            await embedMessage.react('⬅️');
            await embedMessage.react('➡️');

            page2 = false;

            const reactionFilter = (reaction, user) => (reaction.emoji.name == '⬅️' || reaction.emoji.name == '➡️') && user.id != embedMessage.author.id;
            const collector = embedMessage.createReactionCollector(reactionFilter, { time: 45000 });
            collector.on('collect', (reaction, user) => {
                if (reaction.emoji.name == '➡️') {
                    embedMessage.edit(page2Embed);
                    page2 = true;
                    reaction.users.remove(user.id);
                } else if (reaction.emoji.name == '⬅️') {
                    embedMessage.edit(page1Embed);
                    page2 = false;
                    reaction.users.remove(user.id);
                }
            })

            const messageFilter = m => (m.content >= 1 && m.content <= 36);
            bossUrl = await message.channel.awaitMessages(messageFilter, { max: 1, time: 45000, errors: ['time'] })
                .then(result => {

                    let chosen = result.first().content;
                    var url;

                    if (chosen < 19) {
                        url = bossArray1[chosen - 1].url;
                    } else {
                        url = bossArray2[chosen - 19].url;
                    }

                    return url;

                }).catch(error => {
                    console.error(error);
                    return false;
                });

        } else {

            let search = args.join(' ').toLowerCase();
            let bestMatch = StringSimilarity.findBestMatch(search, bossArray1.concat(bossArray2).map(boss => boss.nome));
            
            bossUrl = bossArray1.concat(bossArray2)[bestMatch.bestMatchIndex].url;

            if (!bossUrl) return message.channel.send('Não achei nada');

        }

        if (!bossUrl) return;

        let voiceChannel = await Play.getVoiceChannel(message);
        if (!voiceChannel) return;

        Play.playAudio(bossUrl, voiceChannel, message);

    }
}
