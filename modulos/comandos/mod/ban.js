const { MessageEmbed } = require('discord.js');
const db = require('old-wio.db');
const { ownerID } = require("../../owner.json");

module.exports = {
    config: {
        name: "ban",
        category: 'mod',
        aliases: ["b", "banish"],
        description: "Bans the user",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
    },
    run: async (bot, message, args) => {
        try {
            if (!message.member.hasPermission("BAN_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**¡No tienes los permisos para prohibir usuarios! - [BANEAR_MIEMBROS]**");
            if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("**¡No tengo los permisos para prohibir usuarios! - [BANEAR_MIEMBROS]**");
            if (!args[0]) return message.channel.send("**¡Proporcione un usuario para prohibir!**")

            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!banMember) return message.channel.send("**El usuario no está en el servidor**");
            if (banMember === message.member) return message.channel.send("**No puedes prohibirte a ti mismo**")

            var reason = args.slice(1).join(" ");

            if (!banMember.bannable) return message.channel.send("**No puedo patear a ese usuario**")
            try {
            message.guild.members.ban(banMember);
            banMember.send(`**Hola, te han prohibido  de ${message.guild.name} por - ${reason || "Sin razón"}**`).catch(() => null)
            } catch {
                message.guild.members.ban(banMember)
            }
            if (reason) {
            var sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${banMember.user.username}** ha sido prohibido por ${reason}`)
            message.channel.send(sembed)
            } else {
                var sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${banMember.user.username}** ha sido prohibido por`)
            message.channel.send(sembed2)
            }
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (channel == null) return;

            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderacion**", "baneo")
                .addField("**Baneado**", banMember.user.username)
                .addField("**ID**", `${banMember.id}`)
                .addField("**Baneado por**", message.author.username)
                .addField("**Rason**", `${reason || "**No Rason**"}`)
                .addField("**Fecha**", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
};
