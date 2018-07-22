const Discord = require('discord.js')
const rq = require('request')
exports.run=(client,message,cmd)=>{
    if(message.channel.nsfw===false){
        message.channel.send('( ͡° ͜ʖ ͡°) Please go to `NSFW` place')
        return
    }
    rq.get('https://nekos.life/lewd',(err,res,body)=>{
		let strindex = body.split('"')
		let ans = strindex.find(m=>{
			return m.indexOf('https://cdn.nekos.life/lewd')===0
		})
		message.channel.send(new Discord.RichEmbed().setImage(ans))
	})
}