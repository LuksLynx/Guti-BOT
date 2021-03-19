const Discord = require("discord.js")
const ytdl = require('discord-ytdl-core');
const ytsr = require('ytsr');

module.exports = {
    name: 'play',
    description: 'play em video de youtube',
    async execute(message, args,) {
        let videoUrl = args[0];

        const channels = message.guild.channels;

        var voiceChannel = [];

        const voiceChannels = channels.cache.filter(canal => canal.type == 'voice');

        voiceChannels.forEach(element => {
            element.members.forEach((member) => {
                if (member.id == message.author.id)
                    voiceChannel = element;
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
                .catch(warning => message.channel.send('Demorou demais'))

        }
        this.voiceConnection = await voiceChannel.join();
		this.voiceConnection.play(ytdl(videoUrl, { filter: "audioonly", opusEncoded: true }), { type: 'opus', volume: 0.5 })
		.on("finish", async () => {
			voiceChannel.leave();
		});
    },
    voiceConnection: {}
}