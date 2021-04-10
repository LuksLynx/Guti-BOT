const Discord = require('discord.js');
const { database } = require("../index.js");

module.exports = {
    name: 'title',
    description: 'this is a ping command',
    async execute(message, args) {

        let guildId = message.channel.guild.id;
        let memberId = args[1].match(/(<@\!\d+>)/g)[0].match(/\d+/g)[0];
        let title = args[2];

        if (args[0] == 'add') { //ADD

            let insertTitleID;
            let titleExists = await database.query(`SELECT GGTitleID FROM GGTitle WHERE LOWER(GGTTitle) = '${title}' AND GGGuildID = ${guildId}`);

            if (!titleExists) {
                let query = await database.query(`INSERT INTO GGTitle (GGGuildID, GGTTitle) VALUES (${guildId}, '${title}')`, true);
                insertTitleID = query.insertId;
            } else {
                insertTitleID = titleExists.GGTitleID
            }

            await database.query(`INSERT INTO GGTitleUser (GGGuildID, GGTUUserID, GGTitleID) VALUES (${guildId}, ${memberId}, ${insertTitleID})`);
            return message.channel.send('Título inserido com sucesso.');
        }

        if (args[0] == 'remove') { //REMOVE

            let titleId = await database.query(`SELECT GGTitleID FROM GGTitle WHERE LOWER(GGTTitle) = '${title}' AND GGGuildID = ${guildId}`);
            titleId = titleId.GGTitleID; //pega o id do titulo na tabela de titulos da guilda
           
            let userTitleid = await database.query(`SELECT GGTitleUserID FROM GGTitleuser WHERE GGTUUserID = ${memberId} AND GGGuildID = ${guildId} AND GGTitleID = ${titleId}`);
            userTitleid = userTitleid.GGTitleUserID; // pega o id do titulo na tabela de titulos de usuários onde o user seja da guilda acima e tenha o titulo passado
            
            if(userTitleid){
                await database.query(`DELETE FROM GGTitleuser WHERE GGTitleUserID = ${userTitleid}`);
                return message.channel.send('Título removido com sucesso.');
            } else return message.channel.send('Isso nom ecziste');

        }

        if (args[0] == 'show') { //SHOW

            let guildTitleArray = await database.query(`SELECT GGTTitle FROM GGTitleUser INNER JOIN GGTitle USING (GGTitleID) WHERE GGTUUserID = ${memberId} AND GGTitle.GGGuildID = ${guildId}`, true); 
            let titleArray = guildTitleArray.map((guildTitleUser) => guildTitleUser.GGTTitle);

            let guildMemberManager = message.guild.members;
            let guildMember = await guildMemberManager.fetch(String(memberId));

            let userNickname = guildMember.displayName;
            let user = guildMember.user;
            let userAvatarUrl = user.avatarURL();

            const displayTitles = new Discord.MessageEmbed()
                .setColor('#9400D3')
                .setTitle(`Títulos de Honra de ${userNickname}`)
                .setThumbnail(userAvatarUrl)
                .setDescription(titleArray.length ? titleArray.map((i) => `**${i}**`).join("\n") : 'Você não tem honra alguma...');
            return message.channel.send(displayTitles);
        }
    }
}