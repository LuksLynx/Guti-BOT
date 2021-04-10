const {database} = require("../index.js");

module.exports = {
    name: 'title',
    description: 'this is a ping command',
    async execute(message, args) {

        let guildId = message.channel.guild.id;
        let memberId = args[1].match(/(<@\!\d+>)/g)[0].match(/\d+/g)[0];
        let title = args[2];

        if(args[0] == 'add'){
            
            let insertTitleID;
            let titleExists = await database.query(`SELECT GGTitleID FROM GGTitle WHERE LOWER(GGTTitle) = '${title}' AND GGGuildID = ${guildId}`);

            if(!titleExists) {
                let query = await database.query(`INSERT INTO GGTitle (GGGuildID, GGTTitle) VALUES (${guildId}, '${title}')`, true);
                insertTitleID = query.insertId;
            } else {
                insertTitleID = titleExists.GGTitleID
            }
            
            await database.query(`INSERT INTO GGTitleUser (GGGuildID, GGTUUserID, GGTitleID) VALUES (${guildId}, ${memberId}, ${insertTitleID})`);
        }


    }
}