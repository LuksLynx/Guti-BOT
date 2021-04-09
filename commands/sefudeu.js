const ytdl = require('discord-ytdl-core');
const Play = require("./play.js");

module.exports = {
    name: 'sefudeu',
    description: 'o problema é seu',
    async execute(message, args,) {
        
        sefudeuUrl = 'https://www.youtube.com/watch?v=UrU-Ui9sh7M';

        let voiceChannel = await Play.getVoiceChannel(message);
        if(!voiceChannel) return;
        Play.playAudio(sefudeuUrl, voiceChannel);

    }
}