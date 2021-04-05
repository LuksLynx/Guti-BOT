const Play = require("./play.js");

module.exports = {
    name: 'pause',
    description: 'pausa o play',
    async execute(message, args,) {

        if (!Play.guildConnections.get(message.guild.id)) return;

        let guildConnection = Play.guildConnections.get(message.guild.id);
        let { voiceConnection } = guildConnection;

        if (voiceConnection != null && !voiceConnection.dispatcher.paused)
            return voiceConnection.dispatcher.pause();


    }
}