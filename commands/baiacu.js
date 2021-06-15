const ytdl = require('discord-ytdl-core');
const Play = require("./play.js");

module.exports = {
    name: 'baiacu',
    description: 'cenourinha hmmmm',
    async execute(message, args,) {
        
        sefudeuUrl = 'https://www.youtube.com/watch?v=290Ma1tbi-4';

        let voiceChannel = await Play.getVoiceChannel(message);
        if(!voiceChannel) return;
        Play.playAudio(sefudeuUrl, voiceChannel);

    }
}