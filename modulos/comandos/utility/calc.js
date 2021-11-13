const Discord = require('discord.js');
const math = require('mathjs');

module.exports = {
	config: {
		name: 'calculate',
		aliases: ['calc', 'calculator'],
		category: 'utility',
		description: "Shows Calculated Answers Of User's Query",
		usage: 'calc [query](mathematical)'
	},
	run: async (bot, message, args) => {
		if (!args[0])
			return message.channel.send('**Enter Something To Calculate**');

		let result;
		try {
			result = math.evaluate(
				args
					.join(' ')
					.replace(/[x]/gi, '*')
					.replace(/[,]/g, '.')
					.replace(/[÷]/gi, '/')
			);
		} catch (e) {
			return message.channel.send(
				'**¡Ingrese un cálculo válido! ** \n \n ** Lista de cálculos** - \n1. **ecuación sqrt** - `sqrt(3^2 + 4^2) = 5`\n2. **Unidades a Unidades** - `2 pulgadas a centímetros = 0.58`\n3. **Expresiones complejas como** - `cos(45 deg) = 0.7071067811865476`\n4. **Expresiones matemáticas básicas** - `+, -, ^, /, decimals` = **2.5 - 2 = 0.5**'
			);
		}

		let embed = new Discord.MessageEmbed()
			.setColor('GREEN')
			.setAuthor(
				`${bot.user.username} Calculator`,
				message.author.displayAvatarURL({ dynamic: true })
			)
			.addField(
				'**Operation**',
				`\`\`\`js\n${args
					.join('')
					.replace(/[x]/gi, '*')
					.replace(/[,]/g, '.')
					.replace(/[÷]/gi, '/')}\`\`\``
			)
			.addField('**Result**', `\`\`\`js\n${result}\`\`\``)
			.setFooter(message.guild.name, message.guild.iconURL());
		message.channel.send(embed);
	}
};
