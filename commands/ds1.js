const Discord = require("discord.js");
const ytdl = require('discord-ytdl-core');
const Play = require("./play.js");
const StringSimilarity = require('string-similarity');

module.exports = {
    name: 'ds1',
    description: 'toca o soundtrack de um boss de dark sousl 1 disponivel',
    async execute(message, args) {

        const bossArray = [
            { nome: '**1 - Asylum Demon, Taurus Demon, Demon Firesage**', url: 'https://www.youtube.com/watch?v=Q-WQhltJjMo' },
            { nome: '**2 - Bell Gargoyle**', url: 'https://www.youtube.com/watch?v=g7xpyhEw6H0' },
            { nome: '**3 - Capra Demon, Centipede Demon**', url: 'https://www.youtube.com/watch?v=imYBLPp0H9g' },
            { nome: '**4 - Ceaseless Discharge**', url: 'https://www.youtube.com/watch?v=mLu9vKi8E1Y' },
            { nome: '**5 - Chaos Witch Quelaag**', url: 'https://www.youtube.com/watch?v=jsqViZdHPJE' },
            { nome: '**6 - Crossbreed Priscilla**', url: 'https://www.youtube.com/watch?v=GbYGXYmOF8k' },
            { nome: '**7 - Dark Sun Gwyndolin, Moonlight Butterfly**', url: 'https://www.youtube.com/watch?v=wNvujJEQ864' },
            { nome: '**8 - Four Kings**', url: 'https://www.youtube.com/watch?v=hs59egXnb3c' },
            { nome: '**9 - Gaping Dragon**', url: 'https://www.youtube.com/watch?v=6ukC3N1rkzQ' },
            { nome: '**10 - Great Grey Wolf Sif**', url: 'https://www.youtube.com/watch?v=RZVyHH-voR8' },
            { nome: '**11 - Gwyn Lord of Cinder**', url: 'https://www.youtube.com/watch?v=AB6sOhQan9Y' },
            { nome: '**12 - Iron Golem, Stray Demon**', url: 'https://www.youtube.com/watch?v=0mDoGBhjprk' },
            { nome: '**13 - Nito**', url: 'https://www.youtube.com/watch?v=kzmsh7_vgW8' },
            { nome: '**14 - Ornstein and Smough**', url: 'https://www.youtube.com/watch?v=Nsps0I58yUM' },
            { nome: '**15 - Pinwheel**', url: 'https://www.youtube.com/watch?v=sur4qN_4Oi8' },
            { nome: '**16 - Seath the Scaleless**', url: 'https://www.youtube.com/watch?v=6gIrG8SEKvU' },
            { nome: '**17 - The Bed of Chaos**', url: 'https://www.youtube.com/watch?v=FlUaJ3goJ5c' },
        ];

        let bossUrl;

        if (!args || args == '') {

            const newEmbed = new Discord.MessageEmbed()
                .setColor('#ff0229')
                .setThumbnail('https://cdn.discordapp.com/attachments/541793377373650984/857362174074290186/8-2-dark-souls-png-picture.png')
                .setTitle('ESCOLHA SEU BOSS DE DARK SOULS 1')
                .setFooter('30 segundos para escolher')
                .setDescription(bossArray.map((i) => i.nome).join("\n"));
            message.channel.send(newEmbed);
            const filter = m => (m.content >= 1 && m.content <= bossArray.length + 1);
            bossUrl = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                .then(result => {

                    let chosen = result.first().content;
                    let url = bossArray[chosen - 1].url;

                    return url;

                }).catch(error => {
                    console.error(error);
                    return false;
                });

        } else {

            let search = args.join(' ').toLowerCase();
            let bestMatch = StringSimilarity.findBestMatch(search, bossArray.map(boss => boss.nome));
            
            bossUrl = bossArray[bestMatch.bestMatchIndex].url;

            if (!bossUrl) return message.channel.send('Não achei nada');

        }

        if (!bossUrl) return;

        let voiceChannel = await Play.getVoiceChannel(message);
        if (!voiceChannel) return;

        Play.playAudio(bossUrl, voiceChannel, message);

    }
}
