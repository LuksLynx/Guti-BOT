const { random } = require("../utils");

module.exports = {
    name: 'roll',
    description: 'rolar dados inexplicáveis com modificador',
    async execute(message, args) {

        let dice = args.join(''); // transforma o argumento de array para string
        const regex = /(\+|-)\s*\d+/g; // regex pra detectar +/- e o numero depois deles

        if(dice.length <= 0){
            return message.reply('Bota um dado ai');
        }

        if(regex.test(dice) === true){   
            var mod = dice.match(regex);  // separa o modificador em uma string
            var newDice = dice.substring(0,dice.search(/(\+|-)/)); // separa o dado
            dice = newDice;
            var modificador = true;  
        }

        var modLimit = eval(`0 + (${mod})`);
        if(modLimit > 1000){
            return message.reply('Modificador é só até 1000 parceiro');
        }

        if(dice <= 1 || dice > 1000){
            return message.reply('Tem que ser entre 2 e 1000 tá bom?');
        }

        if(isNaN(dice)){
            let regexNumber = /\d+(\+|-)/g;
                if(regexNumber.test(dice) === true){
                        return message.reply('Vai modificar com o vazio seu merda????');
                }
            return message.reply('Precisa ser um número');
        }
        
        let result = await random(1, dice);

        if(modificador === true){
            let finalResult = eval(`${result} + (${mod})`); //eval faz calculos de strings
            return message.reply(`** Roll is ${result}${mod} = ${finalResult}**`);
        } else {
            
            return message.reply(`** Roll is ${result}**`);
        }
            
    }
}