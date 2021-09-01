const { MessageEmbed } = require('discord.js');
const { database } = require("../index.js");

module.exports = {
	name: 'title',
	description: 'dá titulos de honra pros outros',
	async execute(message, args) {

		if (!args[0]) {
			const quickEmbed = new MessageEmbed()
				.setDescription('**GUIA RÁPIDO**')
				.addFields(
					{ name: 'ADICIONAR', value: '%title add <@membro> <títuto>' },
					{ name: 'REMOVER', value: '%title remove <@membro> <títuto>' },
					{ name: 'ADICIONAR', value: '%title show <@membro>' }
				)
			return message.channel.send({ embeds: [quickEmbed] })
		}

		if (args[0] != 'add' && args[0] != 'remove' && args[0] != 'show') return message.reply('Assim não dá né.');
		if (!args[1]) return message.reply('Especifique o membro.');
		if (!/(<@\!\d+>)/g.test(args[1])) return message.reply('Escreve isso direito');

		let guildId = message.channel.guild.id;
		let memberId = args[1].match(/(<@\!\d+>)/g)[0].match(/\d+/g)[0];
		let guildMember = message.guild.members.cache.get(memberId);

		if (!guildMember) return message.reply('Esse maluco não tá aqui.');
		if (args[0] != 'show' && memberId == message.member.id) return message.reply('Somente os outros podem te julgar.');

		let title = args.slice(2).join(' ');
		if (!title && args[0] != 'show') return message.reply('Faltou o TITULU!!!!!!');
		if (args[0] != 'show' && title.length > 40) return message.reply('Tá muito grande.');

		if (args[0] == 'add' && message.member.permissions.has('MANAGE_ROLES')) { //ADD

			let insertTitleID;
			let titleExists = await database.query(`SELECT GGTitleID FROM GGTitle WHERE LOWER(GGTTitle) = '${title}' AND GGGuildID = ${guildId}`);

			if (!titleExists) {
				let query = await database.query(`INSERT INTO GGTitle (GGGuildID, GGTTitle) VALUES (${guildId}, '${title}')`, true);
				insertTitleID = query.insertId;
			} else {
				insertTitleID = titleExists.GGTitleID
			}

			let userHasTitle = await database.query(`SELECT GGTitleUserID FROM GGTitleUser WHERE GGGuildID = ${guildId} AND GGTitleID = ${insertTitleID} AND GGTUUserID = ${memberId}`);
			if (userHasTitle) return message.channel.send('O membro já tem esse título');

			await database.query(`INSERT INTO GGTitleUser (GGGuildID, GGTUUserID, GGTitleID) VALUES (${guildId}, ${memberId}, ${insertTitleID})`);
			return message.channel.send(`Título **${title}** inserido com sucesso para <@${memberId}>.`);

		} else if (args[0] == 'remove' && message.member.permissions.has('MANAGE_ROLES')) { //REMOVE

			let titleId = await database.query(`SELECT GGTitleID FROM GGTitle WHERE LOWER(GGTTitle) = '${title}' AND GGGuildID = ${guildId}`);
			if (!titleId) return message.reply('Esse título não existe.');
			titleId = titleId.GGTitleID;

			let userTitleid = await database.query(`SELECT GGTitleUserID FROM GGTitleUser WHERE GGTUUserID = ${memberId} AND GGGuildID = ${guildId} AND GGTitleID = ${titleId}`);
			if (!userTitleid) return message.reply('Isso nom ecziste');
			userTitleid = userTitleid.GGTitleUserID;

			await database.query(`DELETE FROM GGTitleUser WHERE GGTitleUserID = ${userTitleid}`);
			return message.channel.send(`Título **${title}** removido com sucesso para <@${memberId}>.`);

		} else if (args[0] == 'show') { //SHOW

			let guildTitleArray = await database.query(`SELECT GGTTitle FROM GGTitleUser INNER JOIN GGTitle USING (GGTitleID) WHERE GGTUUserID = ${memberId} AND GGTitle.GGGuildID = ${guildId}`, true);
			let titleArray = guildTitleArray.map((guildTitleUser) => guildTitleUser.GGTTitle);

			let guildMemberManager = message.guild.members;
			let guildMember = await guildMemberManager.fetch(String(memberId));

			let userNickname = guildMember.displayName;
			let user = guildMember.user;
			let userAvatarUrl = user.avatarURL();

			const displayTitles = new MessageEmbed()
				.setColor('#9400D3')
				.setTitle(`Títulos de Honra de ${userNickname}`)
				.setThumbnail(userAvatarUrl)
				.setDescription(titleArray.length ? titleArray.map((i) => `**${i}**`).join("\n") : 'Você não tem honra alguma...');
			return message.channel.send({ embeds: [displayTitles] });
		} else return message.reply('Tu não tem permissão pra isso vagabundo.');
	}
}