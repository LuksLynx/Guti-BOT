const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
    name: 'moedas',
    description: 'mostra o valor do dolar em real',
    async execute(message, args,) {

        let moedas = await axios.get('https://economia.awesomeapi.com.br/all');
        let valores = moedas.data;
        valores = Object.values(valores);
        let valorList = (valores.map((i) => i.name.split('/', 1) + " : ``" + i.ask + "``").join('\n'));
        let date = valores[0].create_date;
        date = new Date(date);

        const lista = new Discord.MessageEmbed()
            .setColor('#9400D3')
            .setTitle('TÁ AI ECONOMISTA')
            .setDescription(valorList)
            .setThumbnail('https://cdn.discordapp.com/attachments/541793377373650984/835161709202505818/paulo-guedes.png')
            .setFooter(date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })+' GMT-3');

        return message.channel.send(lista);

    }
}