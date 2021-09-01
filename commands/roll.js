const { random } = require("../utils");

module.exports = {
	name: 'roll',
	description: 'rolar dados inexplicáveis com modificador',
	async execute(message, args) {

		let dice = args.join(''); 
		const regex = /(\+|-)\s*\d+/g; 

		if (dice.length <= 0) {
			return message.reply('Bota um dado ai');
		}

		if (regex.test(dice) === true) {
			var mod = dice.match(regex);  
			var newDice = dice.substring(0, dice.search(/(\+|-)/)); 
			dice = newDice;
			var modificador = true;
		}

		var modLimit = eval(`0 + (${mod})`);
		if (modLimit > 1000) {
			return message.reply('Modificador é só até 1000 parceiro');
		}

		if (dice <= 1 || dice > 1000) {
			return message.reply('Tem que ser entre 2 e 1000 tá bom?');
		}

		if (isNaN(dice)) {
			let regexNumber = /\d+(\+|-)/g;
			if (regexNumber.test(dice) === true) {
				return message.reply('Vai modificar com o vazio seu merda????');
			}
			return message.reply('Precisa ser um número');
		}

		let result = await random(1, dice);

		if (modificador === true) {
			let finalResult = eval(`${result} + (${mod})`); 
			return message.reply(`**${result}${mod} = ${finalResult}**`);
		} else {
			return message.reply(`**${result}**`);
		}
	}
}