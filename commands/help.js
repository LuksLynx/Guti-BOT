const Discord = require("discord.js")

module.exports = {
    name: 'help',
    description: 'help do bot',
    async execute(message, args) {

        if(args == ''){
        const newEmbed = new Discord.MessageEmbed()
            .setColor('#9400D3')
            .setTitle('COMANDOS DO GUTÃO')
            .addFields(
                { name: ':headphones: COMANDOS DE AUDIO', value: '`%play`  `%stop`  `%boss`' },
                { name: ':crossed_swords: COMANDOS DE UTILIDADE', value: '`%roll`  `%clear`' },
                { name: ':underage: COMANDOS NSFW', value: '`%f95`' },
            )
            .setThumbnail('https://cdn.discordapp.com/attachments/426590652244164609/817549431225581598/tumblr_oof4yaMpvb1vy2tgqo1_400.png')
            .setFooter('Digite "%help <comando>" para mais detalhes')
            message.channel.send(newEmbed);
        }else if (args == 'play'){
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#9400D3')
            .setTitle('COMANDO %play')
            .addFields(
                { name: ':mag:DESCRIÇÃO:', value: 'Toca um video do youtube' },
                { name: ':question:COMO USAR:', value: '`%play` <vídeo>' },
                { name: ':gear:PARAMETRO(s) DO COMANDO:', value: '`vídeo` aqui deve ser utilizado o link do video, caso não seja um link ele irá pesquisar 5 opções de nomes parecidos no youtube para você escolher.' },
            )
            .setThumbnail('https://cdn.discordapp.com/attachments/426590652244164609/817549431225581598/tumblr_oof4yaMpvb1vy2tgqo1_400.png')
            message.channel.send(newEmbed);
        }else if (args == 'stop'){
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#9400D3')
            .setTitle('COMANDO %stop')
            .addFields(
                { name: ':mag:DESCRIÇÃO:', value: 'Encerra qualquer comando de áudio que esteja em execução.' },
                { name: ':question:COMO USAR:', value: '`%stop`' },
            )
            .setThumbnail('https://cdn.discordapp.com/attachments/426590652244164609/817549431225581598/tumblr_oof4yaMpvb1vy2tgqo1_400.png')
            message.channel.send(newEmbed);
        }else if (args == 'boss'){
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#9400D3')
            .setTitle('COMANDO %boss')
            .addFields(
                { name: ':mag:DESCRIÇÃO:', value: 'Toca o tema de um boss disponível a sua escolha.' },
                { name: ':question:COMO USAR:', value: '`%boss`\n<número do boss>' },
                { name: ':gear:PARAMETRO(s) DO COMANDO:', value: '`número do boss` deve ser digitado logo após a mensagem que contem os números dos bosses.' },
            )
            .setThumbnail('https://cdn.discordapp.com/attachments/426590652244164609/817549431225581598/tumblr_oof4yaMpvb1vy2tgqo1_400.png')
            message.channel.send(newEmbed);
        }else if (args == 'roll'){
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#9400D3')
            .setTitle('COMANDO %roll')
            .addFields(
                { name: ':mag:DESCRIÇÃO:', value: 'Rola um dado de 2 até 1000 com um modificador que pode ir até 1000.' },
                { name: ':question:COMO USAR:', value: '`%roll` <dado><+ ou -><modificador>' },
                { name: ':gear:PARAMETRO(s) DO COMANDO:', value: '`dado` escolha um dado de 2 até 1000.\n`+ ou -` escolha se quer somar ou subtrair o modificador.\n`modificador` escolha um modificador de 1 a 1000.' },
            )
            .setThumbnail('https://cdn.discordapp.com/attachments/426590652244164609/817549431225581598/tumblr_oof4yaMpvb1vy2tgqo1_400.png')
            message.channel.send(newEmbed);
        }else if (args == 'clear'){
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#9400D3')
            .setTitle('COMANDO %clear')
            .addFields(
                { name: ':mag:DESCRIÇÃO:', value: 'Deleta de 1 a 20 das mensagens mais recentes, tem um tempo de espera de 10 segundos para usar novamente.' },
                { name: ':question:COMO USAR:', value: '`%clear` <número>' },
                { name: ':gear:PARAMETRO(s) DO COMANDO:', value: '`número` é o número de mensagens que deseja deletar, sendo o máximo 20.' },
            )
            .setThumbnail('https://cdn.discordapp.com/attachments/426590652244164609/817549431225581598/tumblr_oof4yaMpvb1vy2tgqo1_400.png')
            message.channel.send(newEmbed);
        }else if (args == 'f95'){
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#9400D3')
            .setTitle('COMANDO %f95')
            .addFields(
                { name: ':mag:DESCRIÇÃO:', value: 'Sorteia um jogo do fórum F95zone utilizando ou não tags' },
                { name: ':question:COMO USAR:', value: '`%f95` <tag1> <tag2>...<tagN>' },
                { name: ':gear:PARAMETRO(s) DO COMANDO:', value: '`tag` podem ser utilizadas inúmeras tags para sortear um jogo que contenha elas, caso não seja passada tag alguma, será sorteado um jogo da aba de updates mais recentes.' },
            )
            .setThumbnail('https://cdn.discordapp.com/attachments/426590652244164609/817549431225581598/tumblr_oof4yaMpvb1vy2tgqo1_400.png')
            message.channel.send(newEmbed);
        }
        
    }
}
