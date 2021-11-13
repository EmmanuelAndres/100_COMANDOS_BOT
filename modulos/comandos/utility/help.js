const Discord = require('discord.js')
const fs = require("fs");
const { PREFIX } = require("../../config.js");
const db = require('old-wio.db');
const { stripIndents } = require("common-tags");
const { support } = require("../../config.json");

module.exports = {
config: {
    name: "help",
    description: "Help Menu",
    category: 'utility',
    usage: "1) !help \n2) !help [module name]\n3) !help [command (name or alias)]",
    example: "1) !help\n2) !help util\n3) !help ban",
    aliases: ['h']
},
run: async (bot, message, args) => {
    let prefix;
    if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };
    
    try {

    let Categories = ["admin", "fun", "images", "info", "mod", "utility"],
    AllCommands = [];

const Emotes = {
    admin: "🔮Admin",
    fun: "🔮Fun",
    images: "🔮Images",
    info: "🔮Info",
    mod: "🔮Mod",
    utility: "🔮Utility"
};


for (let i = 0; i < Categories.length; i++) {
    const Cmds = await bot.commands.filter(C => C.config.category === Categories[i]).array().map(C => C.config.name).sort((a, b) => a < b ? -1 : 1).join(", ");
    AllCommands.push(`\n\n**${Emotes[Categories[i]]}**\n\`\`\`${Cmds}\`\`\``);
};

const Description = `Mi prefijo es **${prefix}**\n\nPara obtener más información sobre los comandos, escriba el siguiente comando:\n**${prefix}help <nombre del comando> o** <@${bot.user.id}> **help <nombre del comando>**`;

const Embed = new Discord.MessageEmbed()
    .setColor("PURPLE")
    .setImage(`https://cdn.discordapp.com/attachments/887808493908807720/906952720152399872/standard_3.gif`)
    .setAuthor("Comandos", message.author.avatarURL({
        dynamic: true
    }))
    .setDescription(Description + AllCommands.join("") + "" + "\n\n" + `[Invitame](https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot)`)
    .setFooter(`Pedido por ${message.author.username}`, bot.user.displayAvatarURL())
    .setTimestamp();

if (!args[0]) return message.channel.send(Embed);

else {
    const embed = new Discord.MessageEmbed()
    .setColor("PURPLE")
    .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL())
    .setThumbnail(bot.user.displayAvatarURL())

    let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
    if (!command) return message.channel.send(embed.setTitle("**¡Comando inválido!**").setDescription(`**Hacer \`${prefix}help\` ¡Para la lista de los comandos!**`))
    command = command.config

    embed.setDescription(stripIndents`
    ** Comando -** \`${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\`\n
    ** Descripccion -** \`${command.description || "No Descripccion proporcionada."}\`\n
    ** Uso -** [   \`${command.usage ? `${command.usage}` : "No Uso"}\`   ]\n
    ** Ejemplo -** \`${command.example ? `${command.example}` : "Ningun ejemplo encontrado :D"}\`\n
    ** Alias -** [ \`${command.aliases ? command.aliases.join(" , ") : "Ninguno."}\` ]`)
    embed.setFooter(message.guild.name, message.guild.iconURL())

    return message.channel.send(embed)
};
} catch (e) {
  console.log(e);
};

    

}

}