const MFA = require('mangadex-full-api');
const Urlregex = new RegExp('^(https:\/\/mangadex\.org\/title\/[A-Za-z0-9-]+)$');

module.exports = {
    name: 'mangaadd',
    description: 'adiciona mangas para receber notificação de novos capítulos no servidor',
    async execute(message, args) {

        if(!Urlregex.test(args[0])) return message.channel.send('URL inválido');
        let mangaId = args[0].split('title/',2).slice(1);
        let manga = await MFA.Manga.get(mangaId);

        console.log(manga)
        

        
    }
}