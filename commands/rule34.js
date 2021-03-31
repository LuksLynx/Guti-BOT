const axios = require('axios');
const xml2js = require('xml2js');
const utils = require('../utils.js');

module.exports = {
    name: 'rule34',
    description: 'comando para aplicar a regra mais famosa da internet',
    async execute(message, args,) {

        if(message.channel.nsfw === false){
            return message.channel.send('Aqui não pode putaria!');
        }
        
        let tags = args.join(" ").trim().substr(args.indexOf(' ') + 1).replace(' ', '+');

        let processMessage = await message.channel.send('Processando...');

        let baseUrl = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags='+tags;

        let request = await axios.get(baseUrl).then(response => {
            return response.data;
        }).catch(err => {
            console.error(err);
            return message.channel.send("Deu ruim, o servidor está a mimir...");
        });

        let xmlParser = new xml2js.Parser();

        xmlParser.parseStringPromise(request).then(async (result) => {
            let list = result.posts.post;
            let ranPic = await utils.random(0,list.length);
            let chosenPic = list[ranPic];
            let picUrl = chosenPic.$.file_url;
            return processMessage.edit("``Rule34``\n"+picUrl);
        }).catch(err => {
            console.error(err);
            return message.channel.send("Deu ruim.");
        });

    }
}