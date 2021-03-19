const { VoiceConnection } = require("discord.js");
const Play = require("./play.js");

module.exports = {
    name: 'stop',
    descripition: 'da um STOP no video rodando no play',
    execute(message, args) {

        return Play.voiceConnection.dispatcher.end();
        
    }
}