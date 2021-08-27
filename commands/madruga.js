const Play = require("./play.js");

module.exports = {
    name: 'madruga',
    description: 'OLHA O MADRUGA',
    async execute(message, args) {
        
        const madrugaUrl = 'https://www.youtube.com/watch?v=m5bK63TYaL4';

        let voiceChannel = await Play.getVoiceChannel(message);
        if(!voiceChannel) return;
        Play.playAudio(madrugaUrl, voiceChannel, message);

    }
}