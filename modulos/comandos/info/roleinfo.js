const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: 'roleinfo',
        category: 'info',
        description: "shows stats of the mentioned role",
        usage: "m/roleinfo <role mention/role id>",
        aliases: ['rinfo', 'rolei']
    },
    run: async (bot, message, args) => {
        if (!args[0]) return message.channel.send("**¡Ingrese un rol!**")
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
        if (!role) return message.channel.send("**¡Ingrese un rol válido!**");

        const status = {
            false: "No",
            true: "Yes"
        }

        let roleembed = new MessageEmbed()
            .setColor("#2F3136")
            .setTitle(`Informacion del Rol: \`[  ${role.name}  ]\``)
            .setThumbnail(message.guild.iconURL())
            .addField("**ID**", `\`${role.id}\``, true)
            .addField("**Nombre**", role.name, true)
            .addField("**Hex**", role.hexColor, true)
            .addField("**Miembros**", role.members.size, true)
            .addField("**Posicion**", role.position, true)
            .addField("**Mencionable**", status[role.mentionable], true)
            .setFooter(message.member.displayName, message.author.displayAvatarURL(), true)
            .setTimestamp()

        message.channel.send(roleembed);
    }
}