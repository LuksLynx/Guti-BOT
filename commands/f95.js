const { PythonShell } = require('python-shell');

module.exports = {
    name: 'f95',
    description: 'this is a ping command',
    execute(message, args,) {

		let options = {
			args: [JSON.stringify(this.token), '']
		};

		PythonShell.run('./scripts/f95.py', options, (err, results) => {

			if (err) {
				console.log(err); return message.reply("Ihhh deu merda.");
			}

			let result = JSON.parse(results[0]);
			
			if(result['token'])
				this.token = JSON.parse(result['token']);
		});
    },
	token:{}
}