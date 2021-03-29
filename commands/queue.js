const { guildConnections } = require("./play.js");
const Discord = require('discord.js');
const ytdl = require('discord-ytdl-core');
const Play = require("./play.js");
const utilFunctions = require('../utils.js');

module.exports = {
    name: 'queue',
    description: 'mostra a fila do play',
    async execute(message, args,) {

        var guildConnection = Play.guildConnections.get(message.guild.id); 

        if(!guildConnection) return message.channel.send('Não tem fila não colega...');
        
        let songList = guildConnection.songs;
       
        var songsInfo = await Promise.all(songList.map(async (song) => {
            
            let info = await ytdl.getBasicInfo(song);

            let infoObject = {
                title: info.videoDetails.title,
                url: info.videoDetails.video_url
            };

            return infoObject;

        }));

        let embedDescription = songsInfo.map((item, index) => `**${index+1}** - [${item.title}](${item.url})`).join("\n");
        const queueEmbed = new Discord.MessageEmbed()
            .setColor('#9400D3')
            .setTitle('FILA DO GUTÃO')
            .setDescription(await utilFunctions.formatTextLimitCharacters(embedDescription))
        message.channel.send(queueEmbed);
    }       
}