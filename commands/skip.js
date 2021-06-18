const Play = require("./play.js");

module.exports = {
    name: 'skip',
    description: 'pula o item atual do queue',
    async execute(message, args,) {

        if(!Play.guildConnections.get(message.guild.id)) return;

        let guildConnection = Play.guildConnections.get(message.guild.id);
        let { voiceConnection } = guildConnection;

        if((!guildConnection.songs) || (guildConnection.songs.length == 1))
            return message.channel.send('Não tem mais nada para pular.');

        if(voiceConnection != null && voiceConnection.dispatcher != null){
            return voiceConnection.dispatcher.end();
        }

    }
}