const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, args) => {
    var kullanıcı = message.mentions.members.first();
    var isim = args[1];
    var yaş = args[2];

    var kayıtD = db.get(`KayıtS_${message.guild.id}`);
    var tag = `${db.fetch(`Tag_${message.guild.id}`)} ` || "";

    if(!kayıtD) return message.channel.send(
        new Discord.RichEmbed()
        .setColor("RED")
        .setTitle("Sistem Kapalı")
        .setDescription("Aktif Etmek İçin: "+`${require("../ayarlar.json").prefix}kayıtS ayarla @rol #kanal`)
        .setTimestamp()
    )
    
    if(message.member.roles.has(kayıtD.yetkili) === false) return message.channel.send(
        new Discord.RichEmbed()
        .setColor("RED")
        .setTitle("Yetkili Değilsin")
        .setTimestamp()
    )

    if(!kullanıcı || !isim || !yaş) return message.channel.send(
        new Discord.RichEmbed()
        .setColor("RED")
        .setTitle("Eksik Argüman")
        .setTimestamp()
    )

    if(kullanıcı.roles.has(kayıtD.rol) == false) return message.channel.send(
        new Discord.RichEmbed()
        .setColor("RED")
        .setTitle("Bu Kullanıcı Zaten Kayıtlı.")
        .setTimestamp()
    )

    kullanıcı.setNickname(`${tag}${isim} | ${yaş}`);
    kullanıcı.removeRole(kayıtD.rol);
    kullanıcı.addRole(kayıtD.erkek);
    db.add(`ErkekKayıt_${message.author.id}`, 1)
    db.add(`ToplamKayıt_${message.author.id}`, 1)

    message.channel.send(
        new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(kullanıcı.displayName, kullanıcı.user.displayAvatarURL)
        .setTitle("Başarıyla Erkek Olarak Kaydedildi.")
        .setTimestamp()
    )
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["e"],
    kategori: "Kayıt",
    permLevel: 0
}

exports.help = {
    name: "erkek",
    description: "Kullanıcıyı Erkek Olarak Kaydedersiniz.",
    usage: "erkek @Kullanıcı İsim Yaş"
}