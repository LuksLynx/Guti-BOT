module.exports = {
    name: 'ping',
    descripition: 'this is a ping command',
    execute(message, args) {

        if (message.member.hasPermission('ADMINISTRATOR')) { //checa se o membro ter permissão de admin
            message.channel.send('pong no administrador corno');
        } else {
            message.channel.send('``VOCÊ NÃO É ADMINISTRADOR``');
        }
    }
}