const wiki = require("wikijs").default();
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "wikipedia",
        aliases: ['wiki'],
        category: "info",
        description: "Shows Results From Wikipedia",
        usage: "[query]",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        if (!args[0]) return message.channel.send("**¡Ingrese una consulta!**")
        let m = await message.channel.send({
            embed: {
                color: "GREEN",
                title: `Buscando en Wikipedia solo para ti ⌛`,
                description: `Por favor espere...`,
            },
        });
        let result;
        const search = await wiki.search(args.join(' '));
        if (!search.results.length) {
            return m.edit({
                embed: {
                    color: "GREEN",
                    title: "¿Que fue eso denuevo? 📚🤓",
                    description: "Incluso Wikipedia no parece saber de qué estás hablando.",
                    footer: {
                        text: "¡Compruebe si hay errores tipográficos o intente buscar otra cosa!",
                    },
                },
            });
        }
        result = await wiki.page(search.results[0]);
        try {
            let description = await result.summary();
            if (description.length > 8192) {
                const FirstEmbed = new MessageEmbed()
                    .setAuthor(result.raw.title)
                    .setColor("GREEN")
                    .setDescription(`${description.substring(0, 1950)}...\nEl artículo es demasiado largo, haz clic [**Aqui**](${result.raw.fullurl}) para leer más!`);
                return m.edit(FirstEmbed);
            } if (description.length < 2048) {
                const SecondEmbed = new MessageEmbed()
                    .setAuthor(result.raw.title)
                    .setColor("GREEN")
                    .setDescription(`${description.slice(0, 2048)}`)
                return m.edit('', SecondEmbed)
            } if (description.length > 2048) {
                const ThirdEmbed = new MessageEmbed()
                    .setAuthor(result.raw.title)
                    .setColor("GREEN")
                    .setDescription(description.slice(0, 2048))
                const FourthEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(description.slice(2048, 4096))
                m.edit('', ThirdEmbed)
                message.channel.send('', FourthEmbed)
            } if (description.length > 4096 && description.length < 6144) {
                const FifthEmbed = new MessageEmbed()
                    .setAuthor(result.raw.title)
                    .setColor("GREEN")
                    .setDescription(description.slice(0, 2048))
                const SixthEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(description.slice(2048, 4096))
                const SeventhEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(description.slice(4096, description.length))
                await m.edit('', FifthEmbed)
                message.channel.send(SixthEmbed)
                message.channel.send(SeventhEmbed)
            } if (description.length > 6144 && description.length < 8192) {
                const EightEmbed = new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(description.slice(0, 2048));
                const NinthEmbed = new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(description.slice(2048, 4096));
                const TenthEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(description.slice(4096, 6144));
                const EleventhEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(description.slice(6144, description.length))
                await m.edit('', EightEmbed);
                message.channel.send(NinthEmbed);
                message.channel.send(TenthEmbed);
                message.channel.send(EleventhEmbed);
            }
        } catch (e){
            return m.edit("¡No disponible!")
        }
    }
};
