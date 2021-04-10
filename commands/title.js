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
            let titleExists = await database.query(`SELECT GTitleID FROM GGuildTitle WHERE LOWER(GTtitle) = '${title}'`);

            if(!titleExists) {
                let query = await database.query(`INSERT INTO GGuildtitle (GTguildID, GTtitle) VALUES (${guildId}, '${title}')`, true);
                insertTitleID = query.insertId;
            } else {
                insertTitleID = titleExists.GTitleID
            }
            
            await database.query(`INSERT INTO GTitleUser (GTguildID, GTuserID, GTtitleID) VALUES (${guildId}, ${memberId}, ${insertTitleID})`);
        }


    }
}