const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'help',
    description: 'help do bot',
    execute(message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
            .setColor('#0x0099ff')
            .setTitle('COMANDOS DO BOT')
            .setDescription('Under Construction')
            .addFields(
                { name: 'Regra 1', value: 'Qualquer tipo de preconceito será punido com banimento' },
                { name: 'Regra 2', value: 'Sem macaquices nos canais de voz' },
                { name: 'Regra 3', value: 'Sem anime e coisa de weeb nos canais de texto, sujeito a banimento' },
            )
            .setImage('https://cdn.discordapp.com/attachments/426590652244164609/817549431225581598/tumblr_oof4yaMpvb1vy2tgqo1_400.png')
            .setFooter('Não se esqueça das regras!')

        message.channel.send(newEmbed);
    }
}
