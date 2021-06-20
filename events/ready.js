const chalk = require('chalk');
const Discord = require('discord.js');

module.exports = client => {
  console.log(chalk.bold.green(`Bot Aktif, Komutlar Yüklendi!`)); // Komutlar Yüklendikten Sonra Bu Logu Atacak.
  client.user.setStatus("dnd"); // Botun Durumunu "Rahatsız Etmeyin" Yapacak.
  /*
        dnd = Rahatsız Etmeyin
        idle = Boşta
        online = Aktif
        (Offline Olamıyor Diye Biliyorum.)
   */
    var oyun = [
        "KARDANADAM",
        "KOMİ SHOUKO"
    ]; // Botun Rastgele Seçeği Durumların Listesi.

    setInterval(function() {
        var random = Math.floor(Math.random() * oyun.length); // Yukarıdaki Listeden Rastgele Bşiy Seçer.
        client.user.setActivity(oyun[random], "https://siberagalar.com"); // Durumu Ayarlar
    }, 5000); // 5 Saniyede 1 Tekrar Eder.
}