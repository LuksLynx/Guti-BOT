const talkedRecently = new Set();
module.exports = {
    name: 'clear',
    description: 'limpa mensagens',
    async execute(message, args) {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            if (talkedRecently.has(message.author.id)) {  // verifica se o usuário está em cooldown no comando
                message.channel.send("Espera um pouco ai amigo ");
            } else {
                if (!args[0]) return message.reply('Esqueceu do número de mensagens :/'); //verifica se tem numero de mensagens
                if (isNaN(args[0])) return message.reply('Só funciona com números né >:('); // verifica se o args é um numero

                if (args[0] > 20) return message.reply('O máximo é 20 :>');
                if (args[0] < 1) return message.reply('O Mínimo é 1 :<');

                await message.channel.messages.fetch({ limit: args[0] }).then(messages => { // deleta a mensagem
                    message.channel.bulkDelete(messages);

                    talkedRecently.add(message.author.id); // adiciona o usuário no cooldown
                    setTimeout(() => {
                        // remove o cooldown depois de 10 segundos
                        talkedRecently.delete(message.author.id);
                    }, 10000);
                })
            }
        } else {
            message.channel.send('Você não é administrador');
        }
    }
}