const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, args) => {
    function setChannel(data) {
        try {
            db.set(`KayıtS_${message.guild.id}.kanal`, data.id);
            return message.channel.send(
                new Discord.RichEmbed()
                .setColor("RANDOM")
                .setTitle("İşlem Başarılı")
                .setDescription(`Kanal Başarıyla ${data} Olarak Ayarlandı.`)
                .setTimestamp()
            )
        } catch (err) {
            message.channel.send(
                new Discord.RichEmbed()
                .setColor("RED")
                .setTitle("Kanal Ayarlanamadı.")
                .setTimestamp()
            )
        }
    }

    function setRole(data) {
        try {
            db.set(`KayıtS_${message.guild.id}.rol`, data.id);
            return message.channel.send(
                new Discord.RichEmbed()
                .setColor("RANDOM")
                .setTitle("İşlem Başarılı")
                .setDescription(`Kayıtsız Rolü Başarıyla ${data} Olarak Ayarlandı.`)
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

    function deleteAll() {
        try {
            db.delete(`KayıtS_${message.guild.id}`);
            return message.channel.send(
                new Discord.RichEmbed()
                .setColor("RANDOM")
                .setTitle("İşlem Başarılı")
                .setDescription(`Sistem Başarıyla Kapatıldı`)
                .setTimestamp()
            )
        } catch (err) {
            message.channel.send(
                new Discord.RichEmbed()
                .setColor("RED")
                .setTitle("Sistem Kapatılamadı.")
                .setTimestamp()
            )
        }
    }

    if(args[0] === "ayarla") {
        if(!message.mentions.roles.first() || !message.mentions.channels.first()) return message.channel.send(
            new Discord.RichEmbed()
            .setColor("RED")
            .setTitle("Eksik Argüman")
            .setTimestamp()
        )
        setChannel(message.mentions.channels.first());
        setRole(message.mentions.roles.first())
    } else if(args[0] === "kapat") {
        if(!db.fetch(`KayıtS_${message.guild.id}`)) return message.channel.send(
            new Discord.RichEmbed()
            .setColor("RED")
            .setTitle("Sistem Zaten Kapalı")
            .setDescription("Aktif Etmek İçin: "+`${require("../ayarlar.json").prefix}kayıtS ayarla @rol #kanal`)
            .setTimestamp()
        )
        deleteAll();
    } else return message.channel.send(
        new Discord.RichEmbed()
        .setColor("RED")
        .setTitle("Hatalı Argüman")
        .setTimestamp()
    )
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["kayıt-sistemi", "kayıtSistemi"],
    kategori: "Ayarlar",
    permLevel: 2
}

exports.help = {
    name: "kayıtS",
    description: "Kayıt Sistemini Açıp Kapatabilirsiniz.",
    usage: "kayıtS ayarla @KayıtsızRolü #KayıtsızKanalı / kapat"
}