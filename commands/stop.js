const Play = require("./play.js");

module.exports = {
    name: 'stop',
    description: 'da um STOP no video rodando no play',
    execute(message, args) {

        if(!Play.guildConnections.get(message.guild.id)) return;

        let guildConnection = Play.guildConnections.get(message.guild.id);
        let { voiceConnection } = guildConnection;

        guildConnection.songs.length = 0;

        if(voiceConnection != null)
            return voiceConnection.dispatcher.end();

    }
}
