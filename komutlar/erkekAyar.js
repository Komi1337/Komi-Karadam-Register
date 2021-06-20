const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, args) => {
    function setRole(data) {
        try {
            db.set(`KayıtS_${message.guild.id}.erkek`, data.id);
            return message.channel.send(
                new Discord.RichEmbed()
                .setColor("RANDOM")
                .setTitle("İşlem Başarılı")
                .setDescription(`Erkek Rolü Başarıyla ${data} Olarak Ayarlandı.`)
                .setTimestamp()
            )
        } catch (err) {
            message.channel.send(
                new Discord.RichEmbed()
                .setColor("RED")
                .setTitle("Rol Ayarlanamadı.")
                .setTimestamp()
            )
        }
    }
    if(!message.mentions.roles.first()) return message.channel.send(
        new Discord.RichEmbed()
        .setColor("RED")
        .setTitle("Eksik Argüman")
        .setTimestamp()
    )
    setRole(message.mentions.roles.first())
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["erkek-ayar", "erkekRol"],
    kategori: "Ayarlar",
    permLevel: 2
}

exports.help = {
    name: "erkekAyar",
    description: "Erkek Rolünü Ayarlarsınız",
    usage: "erkekAyar @ErkekRolü"
}