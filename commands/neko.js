const Discord = require('discord.js')
const rq = require('request')
var src = 'https://nekos.life/'
var lewd = false
var tag = ""
exports.run=(client,message,cmd)=>{
	if(cmd.split(' ')[1]==='lewd'){
		lewd=true
		tag='lewd'
	}
    if(lewd && message.channel.nsfw===false){
        message.channel.send('( ͡° ͜ʖ ͡°) Please go to `NSFW` place')
        return
	}
    rq.get(src+tag,(err,res,body)=>{
		let strindex = body.split('"')
		let ans = strindex.find(m=>{
			if(lewd){
				return m.indexOf('https://cdn.nekos.life/lewd')===0
			}else{
				return m.indexOf('https://cdn.nekos.life/neko')===0
			}
		})
		message.channel.send(new Discord.RichEmbed().setImage(ans))
	})
}