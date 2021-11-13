const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "poll",
        aliases: [""],
        description: "Start a simple poll in the server",
        category: "utility",
        usage: "poll <question>",
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("**¡No tiene suficientes permisos! - [ADMINISTRAR_SERVIDOR]**");

        if (!args[0])
            return message.channel.send("**Por favor ingrese una consulta!**");

        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle(`Poll para  ${message.guild.name} Sevidor`)
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setDescription(args.join(' '))
        var msg = await message.channel.send(embed);

        await msg.react('✅');
        await msg.react('❌');

        message.delete({ timeout: 1000 });
    }
}