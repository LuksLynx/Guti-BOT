const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'info',
	description: 'mostra dados interessantes de um membro da guilda',
	async execute(message, args) {

		if (!args || !/(<@\!\d+>)/g.test(args)) return message.reply('Assim não dá né');

		let memberId = args[0].match(/(<@\!\d+>)/g)[0].match(/\d+/g)[0];;
		let targetMember = message.guild.members.cache.get(memberId);

		if (!targetMember) return message.reply('Esse maluco não tá aqui.');

		let user = targetMember.user;

		let roleManager = targetMember.roles.cache;
		let roles = roleManager.map((role) => role.name);
		roles.pop();

		let id = targetMember.id;
		let joinedAt = targetMember.joinedAt;
		let joinedAtTimeString = joinedAt.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
		let createdAt = user.createdAt;
		let createdAtTimeString = createdAt.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
		let tag = user.tag;
		let nickname = targetMember.nickname;
		if (!nickname) nickname = user.username;
		let avatar = user.avatarURL();

		const Embed = new MessageEmbed()
			.setColor('#9400D3')
			.setAuthor(`${nickname}`, `${avatar}`)
			.setThumbnail(`${avatar}`)
			.addFields(
				{ name: 'Tag', value: `**${tag}**`, inline: true },
				{ name: 'ID', value: `**${id}**`, inline: true },
				{ name: 'Account Created', value: `**${createdAtTimeString} GMT-3**` },
				{ name: 'Joined At', value: `**${joinedAtTimeString} GMT-3**` },
				{ name: 'Roles', value: `**${roles}**` }
			);

		return message.channel.send(({ embeds: [Embed] }));
	}
}