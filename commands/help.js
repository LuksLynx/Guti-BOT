const Discord = require("discord.js")

module.exports = {
    name: 'help',
    description: 'help do bot',
    async execute(message, args) {

		let botPrefix = process.env.BOT_PREFIX;
		
		let commands = {
			audioCommands : ['play', 'stop', 'boss','skip','queue','kubo'],
			utilityCommands : ['roll', 'clear','magik'],
			nsfwCommands : ['f95','nhentai','rule34']
		};

		let commandsDescription = {
			play : {
				description : 'Toca um video do youtube',
				usage : 'play` <vídeo>',
				params: '`vídeo` aqui deve ser utilizado o link do video, caso não seja um link ele irá pesquisar 5 opções de nomes parecidos no youtube para você escolher.'
			},
			stop : {
				description : 'Encerra qualquer comando de áudio que esteja em execução.',
				usage : 'stop`',
			},
			boss : {
				description : 'Toca o tema de um boss disponível a sua escolha.',
				usage : 'boss`\n<número do boss>',
				params: '`número do boss` deve ser digitado logo após a mensagem que contem os números dos bosses.'
			},
			roll : {
				description : 'Rola um dado de 2 até 1000 com um modificador que pode ir até 1000.',
				usage : 'roll` <dado><+ ou -><modificador>',
				params: '`dado` escolha um dado de 2 até 1000.\n`+ ou -` escolha se quer somar ou subtrair o modificador.\n`modificador` escolha um modificador de 1 a 1000.'
			},
			clear : {
				description : 'Deleta de 1 a 20 das mensagens mais recentes, tem um tempo de espera de 10 segundos para usar novamente.',
				usage : 'clear` <número>',
				params: '`número` é o número de mensagens que deseja deletar, sendo o máximo 20.'
			},
			f95 : {
				description : 'Sorteia um jogo do fórum F95zone utilizando ou não tags',
				usage : 'f95` <tag1> <tag2>...<tagN>',
				params: '`tag` podem ser utilizadas inúmeras tags para sortear um jogo que contenha elas, caso não seja passada tag alguma, será sorteado um jogo da aba de updates mais recentes.'
			},
			nhentai : {
				description : 'Sorteia um doujin da página de lançamentos recentes ou um doujin aleatório do site.',
				usage : 'nhentai` [random]',
				params : '`random` caso seja digitado irá sair um doujin aleatório, caso contrário ele virá da página de lançamentos recentes.'
			},
			skip : {
				description : 'Pula o item atual da fila.',
				usage : 'skip`'
			},
			queue : {
				description : 'Mostra a fila de músicas do Gutão',
				usage : 'queue`'
			},
			kubo : {
				description : 'O KUBO TA MALUCO!!!!!',
				usage : 'kubo`'
			},
			rule34 : {
				description : 'Aplica a regra mais famosa da internet, use com cuidado.',
				usage : 'rule34` <tag1> <tag2>...<tagN>',
				params : '`rule34` podem ser usadas inumeras tags, caso a tag contenha duas palavras, elas devem estar separadas por uma underline, se nenhuma tag for atribuida ele irá sortear algo da página inicial.'
			},
			magik : {
				description : 'Distorçe a ultima imagem enviada no canal de texto, só aceita os formatos JPG, PNG, ICO e BMP.',
				usage : 'magik`'
			}
		};

		var newEmbed;

        if(args == ''){
			
			newEmbed = new Discord.MessageEmbed()
				.setColor('#9400D3')
				.setTitle('COMANDOS DO GUTÃO')
				.addFields(
					{ name: ':headphones: COMANDOS DE AUDIO', value: commands.audioCommands.map(item =>  `\`${botPrefix}${item}\``).join(" ") },
					{ name: ':crossed_swords: COMANDOS DE UTILIDADE', value: commands.utilityCommands.map(item =>  `\`${botPrefix}${item}\``).join(" ") },
					{ name: ':underage: COMANDOS NSFW', value: commands.nsfwCommands.map(item =>  `\`${botPrefix}${item}\``).join(" ") },
				)
				.setThumbnail('https://cdn.discordapp.com/attachments/426590652244164609/817549431225581598/tumblr_oof4yaMpvb1vy2tgqo1_400.png')
				.setFooter(`Digite "${botPrefix}help <comando>" para mais detalhes`);

        } else {

			let selectedCommand = commandsDescription[args];

			newEmbed = new Discord.MessageEmbed()
            .setColor('#9400D3')
            .setTitle(`COMANDO ${botPrefix}${args}`)
            .addFields(
                { name: ':mag:DESCRIÇÃO:', value: selectedCommand.description },
                { name: ':question:COMO USAR:', value: `\`${botPrefix}` + selectedCommand.usage },
            )
            .setThumbnail('https://cdn.discordapp.com/attachments/426590652244164609/817549431225581598/tumblr_oof4yaMpvb1vy2tgqo1_400.png');
			
			if(selectedCommand.params)
				newEmbed.addField(':gear:PARAMETRO(s) DO COMANDO:', selectedCommand.params);

		}

		message.channel.send(newEmbed);

    }
}
