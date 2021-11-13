const Discord = require("discord.js")
const moment = require('moment');

const status = {
    online: "En linea",
    idle: "Ausente",
    dnd: "No molestar",
    offline: "Offline/Invisible"
};

module.exports = {
    config: {
        name: "whois",
        description: "userinfo",
        category: 'info',
        usage: "m/whois <mention a member/member id>",
        aliases: ['ui', 'userinfo']
    },
    run: async (bot, message, args) => {
        var permissions = [];
        var acknowledgements = 'None';
        let whoisPermErr = new Discord.MessageEmbed()
        .setTitle("**¡Error de permiso de usuario!**")
        .setDescription("**Lo sentimos, ¡No tienes permisos para usar esto! ❌**")

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        

        if(member.hasPermission("KICK_MEMBERS")){
            permissions.push("Expulsar Miembros");
        }
        
        if(member.hasPermission("BAN_MEMBERS")){
            permissions.push("Banear Miembros");
        }
        
        if(member.hasPermission("ADMINISTRATOR")){
            permissions.push("Administrador");
        }
    
        if(member.hasPermission("MANAGE_MESSAGES")){
            permissions.push("Administrar mensajes");
        }
        
        if(member.hasPermission("MANAGE_CHANNELS")){
            permissions.push("Administrar canales");
        }
        
        if(member.hasPermission("MENTION_EVERYONE")){
            permissions.push("Mencionar Everyone");
        }
    
        if(member.hasPermission("MANAGE_NICKNAMES")){
            permissions.push("Administrar Apodos");
        }
    
        if(member.hasPermission("MANAGE_ROLES")){
            permissions.push("Administrar Roles");
        }
    
        if(member.hasPermission("MANAGE_WEBHOOKS")){
            permissions.push("Administrar webhooks");
        }
    
        if(member.hasPermission("MANAGE_EMOJIS")){
            permissions.push("Administrar emojis");
        }
    
        if(permissions.length == 0){
            permissions.push("No se encontraron permisos clave");
        }
    
        if(member.user.id == message.guild.ownerID){
            acknowledgements = 'Creador del Servidor';
        }
    
        const embed = new Discord.MessageEmbed()
            .setDescription(`<@${member.user.id}>`)
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setColor('RANDOM')
            .setFooter(`ID: ${message.author.id}`)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .addField("__Estatus__",`${status[member.user.presence.status]}`, true)
            .addField('__Se unió a las:__ ',`${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
            .addField('__Creado en__', member.user.createdAt.toLocaleString(), true)
            .addField("__Jugando__", member.presence.activities[0] ? member.presence.activities[0].state : `¡El usuario no tiene un estado personalizado!`, true)
            .addField(`\n__Roles [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]__`,`${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "No Roles"}`, true)
            .addField("\n__Agradecimientos:__ ", `${acknowledgements}`, true)
            .addField("\n__Permisos:__ ", `${permissions.join(` | `)}`);
            
        message.channel.send({embed});
    
    }
    }
