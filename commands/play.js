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
        
        var construct = {
            voiceConnection: null,
            songs: []
        };

        let guildConnection = this.guildConnections.get(message.guild.id);
       
        if(!guildConnection) {
            construct.songs.push(videoUrl);
            this.guildConnections.set(message.guild.id, construct);
        } else {
            if(guildConnection.songs.length > 0) {
                guildConnection.songs.push(videoUrl);
                return message.channel.send("Adicionado na fila.");
            }
        }

        this.playAudio(videoUrl, voiceChannel);

    },
    guildConnections: new Map(),
    async playAudio(url, voiceChannel) {
        
        var guildConnection = this.guildConnections.get(voiceChannel.guild.id);

        if(!url) {
            guildConnection.voiceConnection.channel.leave();
            this.guildConnections.delete(voiceChannel.guild.id);
            return;
        }

        guildConnection.voiceConnection = await voiceChannel.join();
        guildConnection.voiceConnection.play(ytdl(url, { filter: "audioonly", opusEncoded: true }), { type: 'opus', volume: 0.5 })
		.on("finish", async () => {
            guildConnection.songs.shift();
            this.playAudio(guildConnection.songs[0], voiceChannel);
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