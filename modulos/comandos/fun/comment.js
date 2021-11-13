const Discord = require('discord.js');
const config = require('../../config.json');
const canvacord = require('canvacord');

module.exports = {
    config: {
        name: 'comment',
        description: 'Shows your text as a Youtube Comment',
        aliases: ["comment"],
        usage: '<text>',
        category: 'fun',
    },
    run: async (bot, message, args) => {
        const comment = args.join('');
        if(!comment) return message.channel.send(`${bot.emotes.error} Provide something to Comment!`)
        try {    
        let yt = await canvacord.Canvas.youtube({"avatar":message.author.displayAvatarURL({format: "png"}),"username":message.author.username, "content":args.join(" ")})
        let attachment = new Discord.MessageAttachment(yt, 'comment.png')
        message.channel.send(attachment);
    }catch(err) {
        const embed2 = new Discord.MessageEmbed()
    .setTitle(`${bot.emotes.error} Algo salió mal.\n${bot.emotes.error}Nota: no funcionará si el usuario contiene caracteres no deseados en su nombre de usuario.`)
    .setColor(config.embedcolor);
    message.channel.send(embed2);
    }

    }
};