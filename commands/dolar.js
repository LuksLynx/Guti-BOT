const axios = require('axios');

module.exports = {
    name: 'dolar',
    description: 'dolar ué',
    async execute(message, args,) {

        let dolar = await axios.get('https://economia.awesomeapi.com.br/USD-BRL');
        let valor = dolar.data[0].ask;

        return message.channel.send("O Dolar está ``" + valor + "``");

    }
}
