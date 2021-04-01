const { PythonShell } = require('python-shell');
const utils = require('../utils.js');

module.exports = {
    name: 'f95',
    description: 'this is a ping command',
    async execute(message, args,) {

        if(message.channel.nsfw === false){
            return message.channel.send('Aqui não pode putaria!');
        }

        if(utils.badWordsDetector(message.content)){
            return message.channel.send('Essa tag não pode em :face_with_symbols_over_mouth:');
        }

        let tags = '';
        
        const split = message.content.split(" "); split.shift();
        const tagsSplit = split.join(" ").trim();
        tags = tagsSplit.replace(' ', '+');

        let options = {
			args: [JSON.stringify(this.token), tags]
		};

        let processMessage = await message.channel.send("Processando...Isso pode demorar alguns segundos");

		PythonShell.run('./scripts/f95.py', options, (err, results) => {

			if (err) {
				console.log(err); return processMessage.edit("Ihhh deu merda.");
			}

			let result = JSON.parse(results[0]);
            processMessage.edit(result['url']);
			
			if(result['token'])
				this.token = JSON.parse(result['token']);
		});
    },
	token:{}
}