const { PythonShell } = require('python-shell');
const fs = require('fs-extra');

module.exports = {
    name: 'magik',
    description: 'magik comando sim',
    async execute(message, args,) {

        let latestMessages = await message.channel.messages.fetch({ limit: 5 });
        let image = [];
		let guildId = message.guild.id;

        Array.from(latestMessages).forEach(message => {
            if (message[1].embeds.length > 0 || message[1].attachments.size > 0) {
                (message[1].embeds.length > 0) ? image = message[1].embeds : image = message[1].attachments;
                return true;
            }
        });

        let imageUrl;
        if (image.length == 1) {
            (image[0].image) ? imageUrl = image[0].image.url : imageUrl = image[0].thumbnail.url;
        } else if (image.size > 0){
            let finalImage = Array.from(Array.from(image)[0]);
			imageUrl = finalImage[1].url;
        } else {
            return message.channel.send('Num achei nada pá trabaia');
        }

        PythonShell.run('./scripts/magik.py', { args: [imageUrl, guildId] }, (err,result) => {
            if(err){
                console.log(err);
                return message.channel.send('Faio...');
            }

            if(result[0] == 'error_requests') {
                return message.channel.send('A imagem ta quebrada');
            } else if(result[0] == 'error_extension') {
                return message.channel.send('Só pode : .jpg .png .bmp .ico');
            }

			let path = `./images/${guildId}/${result[0]}`;
			if(fs.existsSync(path)) {
                message.channel.send("M4gyk", { files : [path] }).then(fs.remove(path));
			} else {
				message.channel.send('O caminho tá muito obscuro.');
			}
            
		});

        }

    }

