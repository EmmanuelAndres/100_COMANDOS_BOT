const Discord = require('discord.js');
const request = require('node-superfetch');
const { stripIndents } = require('common-tags');
const twitter = require('twitter-api.js');
module.exports = {
	config: {
		name: 'twitter',
		description: 'Shows info about a Twitter user',
		aliases: ['tweet'],
		category: 'info',
		usage: 'twitter <twitter name>'
	},
	run: async (bot, message, args) => {
		let user = args[0];
		if (!user) return message.channel.send('Proporcione su nombre de twitter');

		try {
			const body = await twitter.users(user);
			const tweet = new Discord.MessageEmbed()
				.setColor('BLUE')
				.setAuthor(
					`@${body.screen_name.toLowerCase()}`,
					body.verified
						? 'https://emoji.gg/assets/emoji/6817_Discord_Verified.png'
						: null
				)
				.setDescription(
					stripIndents` ${body.description}
      \`•\` Seguidores: **${body.followers_count.toLocaleString()}**
      \`•\` Sigue: **${body.friends_count.toLocaleString()}**
      \`•\` Tweets: **${body.statuses_count.toLocaleString()}**
      \`•\` Cuenta creada en: ${body.created_at}`
				)
				.setFooter(
					`Twitter ID: ${body.id}`,
					'https://abs.twimg.com/favicons/twitter.ico'
				)
				.setThumbnail(body.profile_image_url_https.replace('_normal', ''))
				.setImage(body.profile_banner_url);
			message.channel.send(tweet);
		} catch (e) {
			if (e.status === 403)
				return message.channel.send(
					'Este usuario está en modo privado o cuenta eliminada'
				);
			else if (e.status === 404) return message.channel.send('No Encontrado');
			else return message.channel.send(`Error desconocido: \`${e.message}\``);
		}
	}
};
