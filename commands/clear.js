const talkedRecently = new Set();
module.exports = {
    name: 'clear',
    description: 'limpa mensagens',
    async execute(message, args) {
        if (message.member.permissions.has('ADMINISTRATOR')) {
            if (talkedRecently.has(message.author.id)) {  
                message.reply("Espera um pouco ai amigo ");
            } else {
                if (!args[0]) return message.reply('Esqueceu do número de mensagens :/'); 
                if (isNaN(args[0])) return message.reply('Só funciona com números né >:('); 

                if (args[0] > 20) return message.reply('O máximo é 20 :>');
                if (args[0] < 1) return message.reply('O Mínimo é 1 :<');

                await message.channel.messages.fetch({ limit: args[0] }).then(messages => { 
                    message.channel.bulkDelete(messages);

                    talkedRecently.add(message.author.id); 
                    setTimeout(() => {
                        talkedRecently.delete(message.author.id);
                    }, 10000);
                })
            }
        } else {
            message.reply('Você não é administrador');
        }
    }
}