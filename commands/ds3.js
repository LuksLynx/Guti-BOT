const Discord = require("discord.js");
const ytdl = require('discord-ytdl-core');
const Play = require("./play.js");
const StringSimilarity = require('string-similarity');

module.exports = {
    name: 'ds3',
    description: 'toca o soundtrack de um boss de dark sousl 3 disponivel',
    async execute(message, args) {

        const bossArray = [
            { nome: '**1 - Gundyr**', url: 'https://www.youtube.com/watch?v=Ke3HWo8fTpE' },
            { nome: '**2 - Vordt of the Boreal Valley**', url: 'https://www.youtube.com/watch?v=UIX_-AMuAhY' },
            { nome: '**3 - Curse-Rotted Greatwood**', url: 'https://www.youtube.com/watch?v=iCfNGQEQh44' },
            { nome: '**4 - Crystal Sage**', url: 'https://www.youtube.com/watch?v=RgIcULEEpgE' },
            { nome: '**5 - Abyss Watchers**', url: 'https://www.youtube.com/watch?v=f0LdIZ8TWYo' },
            { nome: '**6 - Deacons of the Deep**', url: 'https://www.youtube.com/watch?v=20XREf55X9E' },
            { nome: '**7 - High Lord Wolnir**', url: 'https://www.youtube.com/watch?v=2t52zdYCNEc' },
            { nome: '**8 - Old Demon King**', url: 'https://www.youtube.com/watch?v=3MbtEecMTXU' },
            { nome: '**9 - Pontiff Sulyvahn**', url: 'https://www.youtube.com/watch?v=EwFA2VdCGcY' },
            { nome: '**10 - Yhorm the Giant**', url: 'https://www.youtube.com/watch?v=PrbZc-J0-Z4' },
            { nome: '**11 - Aldrich, Devourer of Gods**', url: 'https://www.youtube.com/watch?v=x4cdfRrRWf4' },
            { nome: '**12 - Dancer of the Boreal Valley**', url: 'https://www.youtube.com/watch?v=Q3xQga-2LX4' },
            { nome: '**13 - Dragonslayer Armour**', url: 'https://www.youtube.com/watch?v=Xy2OCRmxVAY' },
            { nome: '**14 - Lothric, Younger Prince**', url: 'https://www.youtube.com/watch?v=tFRaZs6ri7s' },
            { nome: '**15 - Ancient Wyvern**', url: 'https://www.youtube.com/watch?v=bfWNxsegbiM' },
            { nome: '**16 - Nameless King**', url: 'https://www.youtube.com/watch?v=ajq6MFS_ysM' },
            { nome: '**17 - Soul of Cinder**', url: 'https://www.youtube.com/watch?v=Z9dNrmGD7mU' },
            { nome: '**18 - Champions Gravetender**', url: 'https://www.youtube.com/watch?v=NN8dCyG-Pqo' },
            { nome: '**19 - Sister Friede**', url: 'https://www.youtube.com/watch?v=jAuIY58nv_k' },
            { nome: '**20 - Demon Prince**', url: 'https://www.youtube.com/watch?v=sQ_byT2KAiY' },
            { nome: '**21 - Halflight, Spear of the Church**', url: 'https://www.youtube.com/watch?v=O31_IyWhDso' },
            { nome: '**22 - Darkeater Midir**', url: 'https://www.youtube.com/watch?v=IiOo56N0Om4' },
            { nome: '**23 - Slave Knight Gael**', url: 'https://www.youtube.com/watch?v=xggWJLgN-Es' }
        ];

        let bossUrl;

        if (!args || args == '') {

            const newEmbed = new Discord.MessageEmbed()
                .setColor('#ff0229')
                .setThumbnail('https://cdn.discordapp.com/attachments/541793377373650984/857362207028150292/Dark_Souls_III_Icon_PNG.png')
                .setTitle('ESCOLHA SEU BOSS DE DARK SOULS 3')
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

            if (!bossUrl) return message.channel.send('N??o achei nada');

        }

        if (!bossUrl) return;

        let voiceChannel = await Play.getVoiceChannel(message);
        if (!voiceChannel) return;

        Play.playAudio(bossUrl, voiceChannel, message);

    }
}
