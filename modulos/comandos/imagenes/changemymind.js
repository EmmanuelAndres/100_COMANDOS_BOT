const { MessageEmbed } = require('discord.js');
const Random = require("srod-v2");

module.exports = {
config: {
    name: 'changemymind',
    category: 'images',
    description: 'Change your mind',
    usage: 'changemymind',
    aliases: [''],
},
    run: async(bot, message, args) => {
    
        let change = args[0];
    if (!change) return message.channel.send("Por favor proporcione el texto");

    let data = await Random.ChangeMyMind({ Message: change });

    message.channel.send(data);
    }
};