const { ownerID } = require('../../owner.json') 

module.exports = {
    config: {
      name: "dm",
      category: 'mod',
      description: "DM a user in the guild",
      aliases: ['pm']
    },
    run: async (bot, message, args) => {
        
        if(!message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES") && !ownerID.includes(message.author.id)) return;


      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (!user)
        return message.channel.send(
          `No mencionaste a un usuario o proporcionaste una identificación no válida`
        );
      if (!args.slice(1).join(" "))
        return message.channel.send("No especificaste tu mensaje");
      user.user
        .send(args.slice(1).join(" "))
        .catch(() => message.channel.send("¡Ese usuario no pudo ser enviado por DM!"))
        .then(() => message.channel.send(`Envió un mensaje a ${user.user.tag}`));
    },
  };