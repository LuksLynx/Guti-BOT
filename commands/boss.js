const Discord = require("discord.js");
const ytdl = require('discord-ytdl-core');
const Play = require("./play.js");

module.exports = {
    name: 'boss',
    description: 'toca o soundtrack de um boss disponivel',
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

        const newEmbed = new Discord.MessageEmbed()
            .setColor('#ff0229')
            .setTitle('ESCOLHA SEU BOSS')
            .setDescription(bossArray.map((i) => i.nome).join("\n"));
        message.channel.send(newEmbed);
        const filter = m => (m.content >= 1 && m.content <= bossArray.length + 1);
        let bossUrl = await message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
            .then(result => {

                let chosen = result.first().content;
                let url = bossArray[chosen - 1].url;

                return url;

            }).catch(error => console.error(error));

        const channels = message.guild.channels;

        var voiceChannel = [];

        const voiceChannels = channels.cache.filter(canal => canal.type == 'voice');

        voiceChannels.forEach(channel => {
            channel.members.forEach((member) => {
                if (member.id == message.author.id)
                    voiceChannel = channel;
            });
        });

        if (voiceChannel.length <= 0) {
            return message.reply('Entra em um canal de voz mermão >:/');
        }

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            return message.channel.send(
                'Eu não consigo :('
            );
        }

        if (!ytdl.validateURL(bossUrl)) {
            return message.channel.send('O vídeo morreu :sob:');
        }


        Play.voiceConnection = await voiceChannel.join();
        Play.voiceConnection.play(ytdl(bossUrl, { filter: "audioonly", opusEncoded: true }), { type: 'opus', volume: 0.5 })
            .on("finish", async () => {
                voiceChannel.leave();
            });
    }
}
