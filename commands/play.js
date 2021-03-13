const ytdl = require('discord-ytdl-core');
module.exports = {
    name: 'play',
    descripition: 'play em video de youtube',
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
            return message.channel.send(
                'Esse vídeo não existe, igual a relevância da sua vida >:)'
            )
        }

        var connection = await voiceChannel.join();
        
        connection.play(ytdl(videoUrl, { filter: "audioonly", opusEncoded: true }), {type:'opus', volume:0.5})
        .on("finish", async () => {
           voiceChannel.leave(); 
        });

    }
}