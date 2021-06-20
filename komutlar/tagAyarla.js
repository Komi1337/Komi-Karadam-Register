const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, args) => {
    var tag = args[0];
    if(!tag) return message.channel.send(
        new Discord.RichEmbed()
        .setColor("RED")
        .setTitle("Bir Tag Belirtmediniz.\nÖrneğin: ☬TF☬")
    )

    try {
        db.set(`Tag_${message.guild.id}`, tag);
        return message.channel.send(
            new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle("İşlem Başarılı")
            .setDescription(`Bu Sunucunun Tagı Başarıyla ${tag} Olarak Ayarlandı.`)
            .setTimestamp()
        )
    } catch (err) {
        message.channel.send(
            new Discord.RichEmbed()
            .setColor("RED")
            .setTitle("Tag Ayarlanamadı.")
            .setTimestamp()
        )
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ototag", "oto-tag", "tag-ayarla"],
    kategori: "Ayarlar",
    permLevel: 2
}

exports.help = {
    name: "tag",
    description: "Oto-tag Ayarlama Komutu",
    usage: "tag Tag"
}