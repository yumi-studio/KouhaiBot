exports.run = (Discord,rdc,client,message,cmd) =>{
	if(message.channel.type!=="text"){
		return
	}
	let req = require('request')
	let em = new Discord.RichEmbed()
	let name = message.author.username
	let dcjoin = `Join discord|${message.member.joinedAt.getDate()}/${message.member.joinedAt.getMonth()+1}/${message.member.joinedAt.getFullYear()}`
	let svjoin = `Join server|${message.author.createdAt.getDate()}/${message.author.createdAt.getMonth()+1}/${message.author.createdAt.getFullYear()}`
	let fs = require("fs")
	let Canvas = require("../node_modules/canvas"),
	img = new Canvas.Image,
	ava = new Canvas.Image,
	canvas = Canvas.createCanvas(500,200),
	ctx = canvas.getContext("2d")

	ava.onload = function(){
		ctx.fillStyle = "#2E4272"
		ctx.globalAlpha=0.75
		ctx.fillRect(0,0,500,200)
		ctx.globalAlpha=1
		ctx.fillStyle = "#7887AB"
		ctx.fillRect(195,25,280,30)
		ctx.fillRect(195,65,280,30)
		ctx.fillRect(195,105,280,30)
		ctx.fillRect(195,145,280,30)
		ctx.drawImage(ava,25,25,150,150)
		ctx.font = "20px 'Arial'"
		ctx.fillStyle = "rgba(255,255,255,0.9)"
		if(ctx.measureText(name).width>280){
			ctx.fillText(name.slice(0,9)+"...",200,47)
		}else{
			ctx.fillText(name,200,47)
		}
		ctx.fillText(dcjoin,200,87)
		ctx.fillText(svjoin,200,127)
		ctx.fillText('Rank|'+message.member.highestRole.name,200,167)
		canvas.createPNGStream().pipe(
			fs.createWriteStream('src/info.png').on("close",()=>{message.channel.send(new Discord.Attachment("src/info.png"))})
		)
	}

	try {
		rq.get(client.user.avatarURL.replace('=2048','=256'),{encoding:null},(err,res)=> {
			ava.src = res.body
		})
	} catch (error) {
		console.log(error)
		return
	}

}