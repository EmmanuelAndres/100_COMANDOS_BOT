const db = require("old-wio.db");
const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
    name : 'removeafk',
    aliases: ["rafk"],
    category: "utility",
    description: "Removes your afk if you have set one",
    usage: "rafk",
  },
    run : async(bot, message, args) => {
        const check = await db.fetch(`afk-${message.author.id}+${message.guild.id}`)
        if(check === true) {
          message.channel.send("No has estado en un afk hasta ahora");
        } else {
        const embed = new MessageEmbed()
        .setDescription(`Tu afk se desactivo`)
        .setColor("GREEN")
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))
        .setTimestamp();
        message.channel.send(embed)                }
    }
};