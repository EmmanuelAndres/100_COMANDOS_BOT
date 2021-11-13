const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
    
        name: "deafen",
        category: 'mod',
        description: "Deafen a member in a voice channel",
        usage: "deafen <user>",
        aliases: ["deaf"]
       
    },

    run: async(bot, message, args) => {
         if (!message.member.hasPermission("DEAFEN_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**¡No tienes los permisos para prohibir usuarios! - [DEAFEN_MEMBERS]**");
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!member) return message.channel.send("No se pudo encontrar al usuario mencionado en este gremio.")

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No se proporcionó ninguna razón";


        try {
            member.voice.setDeaf(true, reason);
            message.channel.send("Exito <:yesdos:905203866100989993> :Miembro ensordecido")
        } 
        
        catch(error) {
            console.log(error)
            message.channel.send("¡UPS! Un error desconocido ocurrió. Por favor, inténtelo de nuevo más tarde.")
        }

    }
}