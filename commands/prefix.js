const { database } = require("../index.js");

module.exports = {
    name: 'prefix',
    description: 'muda o prefixo do bot no servidor',
    async execute(message, args) {

        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Você não é Administrador');

        var currentPrefix = await database.query(`SELECT GGPrefix FROM GGuild WHERE GGGuildID = ${message.guild.id}`);

        if (args.length == 0) return message.channel.send(`Seu prefixo atual é : ${currentPrefix.GGPrefix}`);
        if (args.length > 1) return message.channel.send('Assim não pode.');

        let newPrefix = args[0];

        if (newPrefix == currentPrefix.GGPrefix) return message.channel.send('Seu prefixo já é esse.');
        if (newPrefix.length > 3) return message.channel.send('Prefixo pode ter até 3 caracteres.');

        await database.query(`UPDATE GGuild SET GGPrefix = '${newPrefix}' WHERE GGGuildID = ${message.channel.guild.id}`);
        return message.channel.send(`Seu prefixo agora é **${newPrefix}**`);

    }
}