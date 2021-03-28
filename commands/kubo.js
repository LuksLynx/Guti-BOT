const ytdl = require('discord-ytdl-core');
const { getVoiceChannel } = require('./play.js');
const Play = require("./play.js");

module.exports = {
    name: 'kubo',
    description: 'kubão mandando vê',
    async execute(message, args,) {

        kuboUrl = 'https://www.youtube.com/watch?v=38jaWL3O81U';

        let voiceChannel = await Play.getVoiceChannel(message);
        if(!voiceChannel) return;
        Play.playAudio(kuboUrl, voiceChannel);
    }
}