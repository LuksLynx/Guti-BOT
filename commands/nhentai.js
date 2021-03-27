const { PythonShell } = require('python-shell');

module.exports = {
    name: 'nhentai',
    description: 'sort a nhentai doujin',
    async execute(message, args,) {

        if (message.channel.nsfw === false) {
            return message.channel.send('Aqui não pode putaria!');
        }

        let rand = '';
        if (args[0] == 'random') {
            rand = 'random'
        }

        let options = {
            args: [rand]
        };

       let processMessage = await message.channel.send('Processando...');

        PythonShell.run("./scripts/nhentai.py", options, (err, result) => {

            if (err) {
                console.log(err);
                return processMessage.edit('deu bosta...');
            }
            if (result) {
                return processMessage.edit(result[0]);
            }
        });
    }
}