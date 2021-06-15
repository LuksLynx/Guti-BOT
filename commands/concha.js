const utils = require ('../utils.js');

module.exports = {
    name: 'concha',
    description: 'pergunte algo à concha mágica',
    async execute(message, args) {

        const answers = ['Sim.', 'Não.', 'Pergunte mais tarde.', 'É melhor que não saiba agora.', 'Não sou capaz de opinar.', 
        'Se concentre e pergunte novamente.', 'Não conte com isso.', 'Com certeza.', 'Se você diz então deve ser.', 
        'Muito provavelmente.', 'Minha resposta é não.', 'Minhas fontes dizem que não.', 'Resposta muito nebulosa, pergunte de novo.', 
        'Os sinais apontam que sim.', 'Duvido muito.', 'Sem dúvida.', 'Conte com isso.','S31 L4 M4LUC0 V41 S3 FUD3',
        'V41 P3RGUNT4R N0 P05T0 1P1R4NG4 0T4R10','M4M4 4QU1','Pergunta pro seu pai aquele CORNO','Pergunta pra sua mãe aquela GOSTOSA.',
        'Nada.', 'Você só pode estar de brincadeira né?',':shushing_face: cala boca otário','Nem fudendo',':no_mouth:',':middle_finger:',
        'Ééééééé, não.',':face_with_raised_eyebrow: Será?',':thinking:','Isso depende do quanto você quer comer alguem.',
        'Teu cú!','Aii mais eu num vo fala rs','Pergunta pro <@713558867249987614>.','Deveria.','Preciso pensar sobre isso.','dont know man i dont speak macaco',
        'Vo vê e te aviso','Meia noite eu te conto','Pode ser que sim'];
        
        //mapAnswers = answers.map((item, index) => `${index+1} - ${item}`).join('\n');
        //console.log(mapAnswers);

        let question = args.join(' ').toUpperCase();
        
        const regex = /[A-Z]{1,}\s{0,}[?]+/g;

        if(!question){
            return message.channel.send('Pergunta algo né imbecil.');
        }
        if(question.length > 75){
            return message.channel.send('Tá escrevendo um livro?');
        }
        if(!question.endsWith('?')){
            return message.channel.send('Isso não é uma pergunta.');
        }
        if(!question.match(regex)){
            return;
        }

        let randAnswer = await utils.random(0,answers.length);
        let chosenAnswer = answers[randAnswer];

        return message.reply(` Perguntou : **${question}**\n A Concha Mágica responde :\n**${chosenAnswer}**`);
}
}