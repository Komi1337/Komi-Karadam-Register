const Discord = require("discord.js");
let talkedRecently = new Set();
const ayarlar = require("../ayarlar.json");

module.exports = message => {
const prefix = ayarlar.prefix;
  if (talkedRecently.has(message.author.id)) return;
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if(!cmd) return message.channel.send(
	  new Discord.RichEmbed()
	  .setColor("RANDOM")
	  .setDescription(`Belirttiğiniz Komut Sistemimde Bulunmamakta`)
	  .setTimestamp()
  )
  if (cmd) {
    if (cmd.conf.enabled === false) {
        if (!process.env.SAHIP.includes(message.author.id) && !process.env.SAHIP.includes(message.author.id)) {
      const embed = new Discord.RichEmbed()
      .setDescription(`**${prefix}${cmd.help.name}** Adlı Komut Şuanda Kullanım Dışıdır`)
      .setColor("RANDOM")
      .setTimestamp()
  message.channel.send({embed})
      return
        }
      }
      if (cmd.conf.guildOnly === true) {
		if (message.channel.type === "dm") {
	  const embed = new Discord.RichEmbed()
	  .setDescription(`**${prefix}${cmd.help.name}** Adlı Komut Özelden Kullanılamaz`)
	  .setColor("RANDOM")
	  .setTimestamp()
  message.channel.send({embed})
	  return
		}
	  }
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
};