const Discord = require("discord.js");
const client = new Discord.Client();
const chalk = require("chalk");
const ayarlar = require("./ayarlar.json");
const db = require("quick.db");
const fs = require("fs");
var moment = require("moment");
require("moment-duration-format");
require('./util/eventLoader.js')(client);

const log = message => {
    console.log(`[KARADAM] | ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} Komut Yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen Komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) return;
  let permlvl = 0;
  if (message.guild.owner.id === message.author) permlvl = 1;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 2;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.on("guildMemberAdd", async member => {
    if(db.fetch(`KayıtS_${member.guild.id}`)) {
        if(!db.fetch(`Tag_${member.guild.id}`)) {
            var tag = db.fetch(`Tag_${member.guild.id}`);
            await member.setNickname(`${tag} İsim | Yaş`);
        } else {
            var kayıtD = db.get(`KayıtS_${member.guild.id}`);
            var zaman = new Date().getTime() - member.user.createdAt.getTime();
            const gecen = moment.duration(zaman).format(`YY [Yıl] DD [Gün] HH [Saat] mm [Dakika] ss [Saniye]`);
            member.setNickname(`İsim | Yaş`);
            await member.addRole(kayıtD.rol);
            member.guild.channels.get(kayıtD.kanal).send(kayıtD.yetkili ? `<@&${kayıtD.yetkili}>` : "",
                new Discord.RichEmbed()
                .setColor("RANDOM")
                .setAuthor(member.user.username, member.user.displayAvatarURL)
                .setTitle("Sunucumuza Hoş Geldin :)")
                .setDescription(`**Seninle Beraber Toplam ${member.guild.memberCount} Kişi Olduk.\nYetkililerimizin Kaydını Yapabilmesi İçin, İsmini ve Yaşını Doğru Bir Şekilde Bu Kanala Yazmalısın.\n\nBu Kullanıcı Hesabını \`${gecen}\` Önce Açmış.**`)
            )
        }
    } else return;
})

client.login(ayarlar.token); // Token ile Botumuzu Aktif Ediyoruz.