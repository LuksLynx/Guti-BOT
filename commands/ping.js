module.exports = {
    name: 'ping',
    description: 'this is a ping command',
    async execute(message, args,) {
        if (message.member.hasPermission('ADMINISTRATOR')) { //checa se o membro ter permissão de admin
            message.channel.send('pong no administrador corno');
        } else {
            message.channel.send('``VOCÊ NÃO É ADMINISTRADOR``');
        }
    }
}