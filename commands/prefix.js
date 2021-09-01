const { database } = require("../index.js");

module.exports = {
    name: 'prefix',
    description: 'muda o prefixo do bot no servidor',
    async execute(message, args) {

        if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply('Você não é Administrador');

        var currentPrefix = await database.query(`SELECT GGPrefix FROM GGuild WHERE GGGuildID = ${message.guild.id}`);

        if (args.length == 0) return message.reply(`Seu prefixo atual é : ${currentPrefix.GGPrefix}`);
        if (args.length > 1) return message.reply('Assim não pode.');

        let newPrefix = args[0];

        if (newPrefix == currentPrefix.GGPrefix) return message.reply('Seu prefixo já é esse.');
        if (newPrefix.length > 3) return message.reply('Prefixo pode ter até 3 caracteres.');

        await database.query(`UPDATE GGuild SET GGPrefix = '${newPrefix}' WHERE GGGuildID = ${message.channel.guild.id}`);
        return message.reply(`Seu prefixo agora é **${newPrefix}**`);

    }
}