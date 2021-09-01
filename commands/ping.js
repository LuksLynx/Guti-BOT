module.exports = {
    name: 'ping',
    description: 'this is a ping command',
    async execute(message) {
        if (message.member.permissions.has('ADMINISTRATOR')) { 
            message.reply('pong no administrador corno');
        } else {
            message.reply('``VOCÊ NÃO É ADMINISTRADOR``');
        }
    }
}