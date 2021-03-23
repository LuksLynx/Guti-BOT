const Discord = require("discord.js")
const ytdl = require('discord-ytdl-core');
const ytsr = require('ytsr');

module.exports = {
    name: 'play',
    description: 'play em video de youtube',
    async execute(message, args,) {

        if(args[0].length <= 0) return message.channel.send("Digita aí mermão");

        let videoUrl = args[0];

        let voiceChannel = await this.getVoiceChannel(message);
        if(!voiceChannel) return;

        if (!ytdl.validateURL(videoUrl)) {
            videoUrl = args.join('');
            let searchResult = await ytsr(videoUrl, { limit: 5 });
            const newEmbed = new Discord.MessageEmbed()
                .setColor('#0x0099ff')
                .setTitle('Escolhe um ai')
                .setDescription(searchResult.items.map((item, index) => `**${index + 1}** - [${item.title}](${item.url}) **(${item.duration})**`).join("\n"))
            message.channel.send(newEmbed);

            const filter = m => (m.content >= 1 && m.content <= 5);
            videoUrl = await message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
                .then(result => {

                    let chosen = searchResult.items[result.first().content-1];
                    let trueUrl = chosen.url;

					return trueUrl;

                })
                .catch(warning => { 
                    message.channel.send('Demorou demais')
                    return false;
                });

        }

        if(!videoUrl) return;

        this.playAudio(videoUrl, voiceChannel);

        
    },
    guildConnections: new Map(),
    async playAudio(url, voiceChannel) {

        let construct = {
            voiceConnection: null
        };

        construct.voiceConnection = await voiceChannel.join();

        this.guildConnections.set(voiceChannel.guild.id, construct);

        let guildConnection = this.guildConnections.get(voiceChannel.guild.id);
        let { voiceConnection } = guildConnection;

        voiceConnection.play(ytdl(url, { filter: "audioonly", opusEncoded: true }), { type: 'opus', volume: 0.5 })
		.on("finish", async () => {
			voiceChannel.leave();
		});
    },
    async getVoiceChannel (message) {
        const channels = message.guild.channels;
        const voiceChannels = channels.cache.filter(canal => canal.type == 'voice');

        var voiceChannel = [];
        voiceChannels.forEach(element => {
            element.members.forEach((member) => {
                if (member.id == message.author.id)
                    voiceChannel = element;
            });
        });

        if (voiceChannel.length <= 0) {
            message.reply('Entra em um canal de voz mermão >:/');
            return false;
        }

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            message.channel.send(
                'Eu não consigo :('
            );
            return false;
        }

        return voiceChannel;

    }
}