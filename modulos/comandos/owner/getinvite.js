const { OWNER_ID } = require("../../config");

module.exports = {
    config: {
        name: "getinvite",
        aliases: ['getinv', 'gi'],
        category: "owner",
        description: "Generates an invitation to the server in question.",
        usage: "[ID | name]",
    },
    run: async(bot, message, args) => {
        if (message.author.id === OWNER_ID) {
        let guild = null;

        if (!args[0]) return message.channel.send("No tengo permisos")

        if(args[0]){
            let fetched = bot.guilds.cache.find(g => g.name === args.join(" "));
            let found = bot.guilds.cache.get(args[0]);
            if(!found) {
                if(fetched) {
                    guild = fetched;
                }
            } else {
                guild = found
            }
        } else {
            return message.channel.send("Nombre Invalido!");
        }
        if(guild){
            let tChannel = guild.channels.cache.find(ch => ch.type == "text" && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
            if(!tChannel) {
                return message.channel.send("Ha ocurrido un error ¡Inténtelo de nuevo!"); 
            }
            let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 }).catch(err => {
                return message.channel.send(`${err} ¡ha pasado!`);
            });
            message.channel.send(invite.url);
        } else {
            return message.channel.send(`\`${args.join(' ')}\` - El bot no está en este servidor`);
        }
    } else {
        return;
    }
    }

}