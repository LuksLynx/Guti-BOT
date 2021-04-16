const Discord = require('discord.js');

module.exports = {
    name: 'info',
    description: 'mostra dados interessantes de um membro da guilda',
    async execute(message, args) {

        if (!args || !/(<@\!\d+>)/g.test(args)) return message.channel.send('Assim não dá né');

        let memberId = args[0].match(/(<@\!\d+>)/g)[0].match(/\d+/g)[0];;

        if (!message.guild.member(memberId)) return message.channel.send('Esse maluco não tá aqui.');

        let guildMember = await message.guild.members.fetch(String(memberId));
        let user = guildMember.user;

        let roleManager = guildMember.roles.cache;
        let roles = roleManager.map((role) => role.name);
        roles.pop();
        
        let id = guildMember.id;
        let joinedAt = guildMember.joinedAt;
        let joinedAtTimeString = joinedAt.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
        let createdAt = user.createdAt;
        let createdAtTimeString = createdAt.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
        let tag = user.tag;
        let nickname = guildMember.nickname;
        if(!nickname) nickname = user.username;
        let avatar = user.avatarURL();

        const Embed = new Discord.MessageEmbed()
            .setColor('#9400D3')
            .setAuthor(`${nickname}`,`${avatar}`)
            .setThumbnail(`${avatar}`)
            .addFields(
                { name: 'Tag' , value: `${tag}`, inline: true},
                { name: 'ID', value: `${id}`, inline: true},
                { name: 'Account Created', value: `${createdAtTimeString} GMT-3`},
                { name: 'Joined At', value: `${joinedAtTimeString} GMT-3`},
                { name: 'Roles', value: `${roles}`}
            );
            
        return message.channel.send(Embed);
    }
}
