exports.run = (Discord,rdc,client,message,cmd) =>{
    let mt = message.mentions.members.first();
    if(mt===null){
        message.channel.send(new Discord.RichEmbed().setImage(message.author.avatarURL))
        return
    }
    message.channel.send(new Discord.RichEmbed().setImage(mt.user.avatarURL));
}