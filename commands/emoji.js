module.exports = {
    name: 'emoji',
    description: 'manda o url do emoji escolhido',
    async execute(message, args) {

        const hasEmote = /<a?:.+:\d+>/gm;
        const emoteRegex = /<:.+:(\d+)>/gm;
        const animatedEmoteRegex = /<a:.+:(\d+)>/gm;

        let findEmote = message.content.match(hasEmote)

        if (emojiId = emoteRegex.exec(findEmote)) {
            let url = "https://cdn.discordapp.com/emojis/" + emojiId[1] + ".png?v=1";
            return message.channel.send(url);
        }
        else if (emojiId = animatedEmoteRegex.exec(findEmote)) {
            let url = "https://cdn.discordapp.com/emojis/" + emojiId[1] + ".gif?v=1";
            return message.channel.send(url);
        }
        else {
            return message.channel.send("Emoji?");
        }
    }
}