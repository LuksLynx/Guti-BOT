const { PythonShell } = require('python-shell');

module.exports = {
    name: 'f95',
    description: 'this is a ping command',
    async execute(message, args,) {

        if(message.channel.nsfw === false){
            return message.channel.send('Aqui não pode putaria!');
        }

        let tags = '';
        
        const split = message.content.split(" "); split.shift();
        const tagsSplit = split.join(" ").trim();
        tags = tagsSplit.replace(' ', '+');

        let options = {
			args: [JSON.stringify(this.token), tags]
		};

        let processMessage = await message.channel.send("Processando...");

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