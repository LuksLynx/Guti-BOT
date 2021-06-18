const Discord = require("discord.js")
const ytdl = require('discord-ytdl-core');
const ytsr = require('ytsr');
const ytpl = require('ytpl');

module.exports = {
    name: 'play',
    description: 'play em video de youtube',
    async execute(message, args,) {

        if (args[0].length <= 0) return message.channel.send("Digita aí mermão");

        let videoUrl = args[0];

        let voiceChannel = await this.getVoiceChannel(message);
        if (!voiceChannel) return;

        if (!ytdl.validateURL(videoUrl) && !ytpl.validateID(videoUrl)) {
            videoUrl = args.join(' ');
            const filters1 = await ytsr.getFilters(videoUrl);
            const filterVideo = filters1.get('Type').get('Video'); //filtra as possiveis playlists que teriam na lista
            let searchResult = await ytsr(filterVideo.url, { limit: 5 });
            const newEmbed = new Discord.MessageEmbed()
                .setColor('#0x0099ff')
                .setTitle('Escolhe um ai')
                .setDescription(searchResult.items.map((item, index) => `**${index + 1}** - [${item.title}](${item.url}) **(${item.duration})**`).join("\n"))
            message.channel.send(newEmbed);

            const filter = m => (m.content >= 1 && m.content <= 5);
            videoUrl = await message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
                .then(result => {

                    let chosen = searchResult.items[result.first().content - 1];
                    let trueUrl = chosen.url;

                    return trueUrl;

                })
                .catch(warning => {
                    message.channel.send('Demorou demais')
                    return false;
                });

        }

        if (!videoUrl) return;

        if (ytpl.validateID(videoUrl)) { // valida se um link é de uma playlist
            this.playList(videoUrl, voiceChannel, message.channel, message);
            return message.channel.send('**PLAYLIST DETECTADA**');
        }

        let guildConnection = this.guildConnections.get(message.guild.id);

        if (!guildConnection) {
            this.guildConnections.set(message.guild.id, this.guildConnectionConstruct);
            guildConnection = this.guildConnections.get(voiceChannel.guild.id);
            guildConnection.songs.push(videoUrl);
        } else {
            if (guildConnection.songs.length > 0) {
                guildConnection.songs.push(videoUrl);
                return message.channel.send("Adicionado na fila.");
            }
        }

        this.playAudio(videoUrl, voiceChannel, message);
    },
    guildConnectionConstruct: {
        voiceConnection: null,
        songs: []
    },
    guildTimeout: [],
    guildConnections: new Map(),
    async playAudio(url, voiceChannel, message){
        var guildId = voiceChannel.guild.id;
        var guildConnection = this.guildConnections.get(guildId);

        if (!guildConnection) {
            this.guildConnections.set(guildId, this.guildConnectionConstruct);
            guildConnection = this.guildConnections.get(guildId);
            guildConnection.songs.push(url);
        }

        if (!url) {
            this.guildTimeout[guildId] = setTimeout(() => {
                this.guildTimeout[guildId] = null;
                guildConnection.voiceConnection.channel.leave();
            }, 60000);
            return;
        } else { clearTimeout(this.guildTimeout[guildId]); }

        if(guildConnection.voiceConnection != null && guildConnection.voiceConnection.dispatcher != null)
            return guildConnection.songs.push(url);

        let getVideoName = await ytdl.getBasicInfo(url);

        guildConnection.voiceConnection = await voiceChannel.join();
        guildConnection.voiceConnection.play(ytdl(url, { filter: "audioonly", opusEncoded: true }), { type: 'opus', volume: 0.5 })
            .on("finish", async () => {
                guildConnection.songs.shift();
                this.playAudio(guildConnection.songs[0], voiceChannel, message);
            });
        message.channel.send(`Tocando: ***${getVideoName.videoDetails.title}***`);
    },
    async getVoiceChannel(message) {
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

    },
    async playList(url, voiceChannel, textChannel, message) {

        let { items: playlistVideos } = await ytpl(url);

        await this.playAudio(playlistVideos[0].shortUrl, voiceChannel, message);
        playlistVideos.shift();

        var guildConnection = this.guildConnections.get(voiceChannel.guild.id);

        playlistVideos.forEach(video => guildConnection.songs.push(video.shortUrl));
        textChannel.send(`${playlistVideos.length} vídeos foram adicionados na fila.`);

    }
}
