const Discord = require("discord.js");

exports.run = (client, message, args) => {
    if(!args[0]) {
        return message.channel.send(
            new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor(`${client.user.username} Yardım Menüsü`, client.user.avatarURL)
            .setTitle(`Toplam Komut: ${client.commands.size}`)
            .setDescription(client.commands.map(c => c.help.name))
            .setTimestamp()
        )
    } else {
        let cmd;
        var command = args[0];
        if (client.commands.has(command)) {
          cmd = client.commands.get(command);
        } else if (client.aliases.has(command)) {
          cmd = client.commands.get(client.aliases.get(command));
        } else return message.channel.send(
            new Discord.RichEmbed()
            .setColor("RED")
            .setTitle("Komut Bulunamadı.")
        )

        message.channel.send(
            new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle(`${require("../ayarlar.json").prefix}${command} Komutu Hakkında Bilgi`)
            .setDescription(cmd.help.description ? cmd.help.description : "")
            .addField("Doğru Kullanım", cmd.help.usage ? `${require("../ayarlar.json").prefix}${cmd.help.usage}` : "Belirtilmemiş.")
            .addField("Komut Aktif mi?", cmd.conf.enabled === true ? "Evet" : "Hayır", true)
            .addField("Bu Komut Sadece Sunucuda mı Kullanılabilir?", cmd.conf.guildOnly === true ? "Evet" : "Hayır", true)
            .addField("Komutun Diğer Kullanımları", cmd.conf.aliases ? cmd.conf.aliases : "Bu Komutun Başka Kullanım Şekli Bulunmamakta.", true)
            .addField("Kategori", cmd.conf.kategori ? cmd.conf.kategori : "Bulunmuyor.", true)
        )
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["y", "help", "h"],
    kategori: "Genel",
    permLevel: 0
}

exports.help = {
    name: "yardım",
    description: "Yardım Menüsü",
    usage: "yardım (İsteğe Bağlı Komut İsmi)"
}