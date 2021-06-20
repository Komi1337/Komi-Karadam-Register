const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, args) => {
    var kullanıcı = message.mentions.members.first() || message.member;
    var kayıtD = db.get(`KayıtS_${message.guild.id}`);
    var kızKayıt = db.fetch(`KızKayıt_${kullanıcı.id}`) || "0";
    var erkekKayıt = db.fetch(`ErkekKayıt_${kullanıcı.id}`) || "0";
    var toplamKayıt = db.fetch(`ToplamKayıt_${kullanıcı.id}`) || "0";

    if(kullanıcı.roles.has(kayıtD.yetkili) === false) return message.channel.send(
        new Discord.RichEmbed()
        .setColor("RED")
        .setDescription(`${kullanıcı} Bir Yetkili Değil.`)
        .setTimestamp()
    )

    if(toplamKayıt < 1) return message.channel.send(
        new Discord.RichEmbed()
        .setColor("RED")
        .setDescription(`${kullanıcı} Adlı Kullanıcının Hiç Kaydı Yok.`)
        .setTimestamp()
    )

    message.channel.send(
        new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(kullanıcı.displayName, kullanıcı.user.displayAvatarURL)
        .setTitle("Adlı Kullanıcının Kayıt İstatistikleri")
        .addField("`Erkek Kayıt:`", erkekKayıt, true)
        .addField("`Kız Kayıt:`", kızKayıt, true)
        .addField("`Toplam Kayıt:`", toplamKayıt, true)
        .setTimestamp()
    )
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["kayıt-istatistik"],
    kategori: "Kullanıcı",
    permLevel: 0
}

exports.help = {
    name: "kayıt",
    description: "Etiketlenen Kullanıcının veya Mesaj Sahibinin Kayıt İstatistiklerini Gösterir.",
    usage: "kayıt (İsteğe Bağlı @Kullanıcı)"
}