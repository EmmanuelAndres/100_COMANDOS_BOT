const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
  name: "8ball",
  aliases: [" "],
  description: "There is a big chance I insult you!",
  category: "fun",
  usage: "8ball",
    },
  run: async (bot, message, args) => {
    let question = message.content.slice(bot.prefix + 6);
    if (!question)
      return message.channel.send(`¡No especificó su pregunta!`);
    else {
      let responses = [
     'Quizás.', 
     'Ciertamente no.', 
     'Eso espero.', 
     'No en tus sueños más locos', 
     'Oh sí.', 
     'Infierno al no', 
     'El futuro es sombrío', 
     'El futuro es incierto',
     'Yo preferiría no decir.', 
     '¿A quién le importa?',
     'Posiblemente.', 
     'Nunca, nunca, nunca', 
     'Hay una pequeña posibilidad.', 
     '¡Sí!'

      ];
      let response =
        responses[Math.floor(Math.random() * responses.length - 1)];
      let Embed = new MessageEmbed()
        .setTitle(`8Ball!`)
        .setDescription(`Tu Pregunta: *${question}*\nMi Respuesta: *${response}*`)
        .setColor(`RANDOM`);
      message.channel.send(Embed);
    }
  },
};
