const Discord = require('discord.js'),
em = new Discord.RichEmbed();

exports.run = (client,message,cmd) =>{
    let mt = message.mentions.members.first();
    if(cmd === null || undefined){
        message.channel.send(em.setImage(message.author.avatarURL))
        return
    }
    message.channel.send(em.setImage(mt.user.avatarURL));
}