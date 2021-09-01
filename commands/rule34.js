const axios = require('axios');
const xml2js = require('xml2js');
const { random, badWordsDetector } = require('../utils.js');

module.exports = {
	name: 'rule34',
	description: 'comando para aplicar a regra mais famosa da internet',
	async execute(message, args) {

		if (message.channel.nsfw === false) {
			return message.reply('Só em canais NSFW!');
		}
		
		if (badWordsDetector(message.content)) {
			return message.reply('Essa tag não pode em :face_with_symbols_over_mouth:');
		}

		let tags = args.join(" ").trim().substr(args.indexOf(' ') + 1).replace(' ', '+');

		let processMessage = await message.channel.send('Processando...');

		let baseUrl = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=' + tags;

		let request = await axios.get(baseUrl).then(response => {
			return response.data;
		}).catch(err => {
			console.error(err);
			return message.channel.send("Deu ruim, o servidor está a mimir...");
		});

		return this.getPic(request, processMessage);
	},
	async getPic(request, proMessage) {
		let xmlParser = new xml2js.Parser();

		xmlParser.parseStringPromise(request).then(async (result) => {
			let list = result.posts.post;
			let ranPic = await random(0, list.length);
			let chosenPic = list[ranPic];
			if (chosenPic.$.has_children == true) {
				this.getPic(request, proMessage);
			}
			let picUrl = chosenPic.$.file_url;
			return proMessage.edit("``Rule34``\n" + picUrl);
		}).catch(err => {
			console.error(err);
			return message.channel.send("Deu ruim.");
		})
	}
}