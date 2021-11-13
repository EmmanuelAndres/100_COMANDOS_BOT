const db = require("old-wio.db");
const axios = require("axios");

module.exports = {
  config: {
  name: 'djsdocs',
  category: 'info',
  aliases: ["docs", "djs"],
  description: 'Displays Discord.JS documentation',
  usage: "djsdocs <query>",
  },
  run: async (bot, message, args) => {
   const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      args
    )}`

    axios
      .get(uri)
      .then((embed) => {
        const { data } = embed

        if (data && !data.error) {
          message.channel.send({ embed: data })
        } else {
          message.reply('No se pudo encontrar esa documentación')
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}