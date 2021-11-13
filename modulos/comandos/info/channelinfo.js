const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "channelinfo",
        aliases: ['ci', 'channeli', 'cinfo'],
        category: "info",
        description: "Shows Channel Info",
        usage: "[ channel mention | channel name | ID] (optional)",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;
        if (!channel) return message.channel.send("**¡Canal no Encontrado!**");

        let channelembed = new MessageEmbed()
            .setTitle(`Información del canal para ${channel.name}`)
            .setThumbnail(message.guild.iconURL())
            .addField("**NSFW**", channel.nsfw, true)
            .addField("**Canal ID**", channel.id, true)
            .addField("**Tipo de Canal**", channel.type)
            .addField("**Descripccion del Canal**", `${channel.topic || "Ninguna Descripccion"}`)
            .addField("**Canal Creado el **", channel.createdAt)
            .setColor("GREEN")
        message.channel.send(channelembed);
    }
}