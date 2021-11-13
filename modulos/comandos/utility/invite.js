const Discord = require("discord.js");
const db = require("old-wio.db");
const { Owner_Name } = require("../../config");
const { support } = require("../../config.json");

module.exports = {
  config: {
  name: "invite",
  aliases: ["invitelink"],
  category: "utility",
  description: "Give You My Invite Link",
  usage: "invite",
  },
  run: async (bot, message, args) => {
    
    const Invite = `https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot`, Owne = `${Owner_Name}`, Dev = ``;
    
    const Embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Gracias por usar el bot")
    .addField("Invitame", `[Click Aqui](${Invite})`, true)
    .addField("Servidor de Soporte", `[Click Aqui](${support})`, true)
    .addField("Owner", Owne, true)
    .setFooter(`Pedido por ${message.author.username}`)
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("Link de Invitacion - " + Invite));
  }
};