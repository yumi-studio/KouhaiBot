exports.run = (Discord,rdc,client,message,cmd) =>{
	if(message.channel.type!=="text"){
		return
	}
	let req = require('request')
	let em = new Discord.RichEmbed()
	let name = message.author.username
	let sv = ['Join server',message.member.joinedAt.getDate(),message.member.joinedAt.getMonth()+1,message.member.joinedAt.getFullYear()-2000]
	let dc = ['Join discord',message.author.createdAt.getDate(),message.author.createdAt.getMonth()+1,message.author.createdAt.getFullYear()-2000]
	let fs = require("fs")
	let Canvas = require("../node_modules/canvas"),
	img = new Canvas.Image,
	ava = new Canvas.Image,
	canvas = Canvas.createCanvas(500,200),
	ctx = canvas.getContext("2d")

	ava.onload = function(){
		ctx.fillStyle = "#7c83af"
		// ctx.globalAlpha=0.75
		ctx.fillRect(0,0,500,200)
		// ctx.globalAlpha=1
		ctx.fillStyle = "#313A75"
		ctx.fillRect(195,25,280,30)
		// ctx.fillRect(195,65,160,30)
		// ctx.fillRect(195,105,160,30)
		ctx.fillRect(275,145,200,30)

		//discord date slot
		ctx.fillRect(365,65,30,30)
		ctx.fillRect(405,65,30,30)
		ctx.fillRect(445,65,30,30)

		//server date slot
		ctx.fillRect(365,105,30,30)
		ctx.fillRect(405,105,30,30)
		ctx.fillRect(445,105,30,30)

		//draw avatar
		ctx.drawImage(ava,25,25,150,150)

		//draw all text
		ctx.font = "20px 'Arial'"
		ctx.fillStyle = "#7C83AF"
		if(ctx.measureText(name).width>280){
			ctx.fillText(name.slice(0,9)+"...",200,47)
		}else{
			ctx.fillText(name,200,47)
		}

		ctx.fillText(dc[0],200,87)
		ctx.fillText(dc[1],365+(30-ctx.measureText(dc[1]).width)/2,87)
		ctx.fillText(dc[2],405+(30-ctx.measureText(dc[2]).width)/2,87)
		ctx.fillText(dc[3],445+(30-ctx.measureText(dc[3]).width)/2,87)

		ctx.fillText(sv[0],200,127)
		ctx.fillText(sv[1],365+(30-ctx.measureText(sv[1]).width)/2,127)
		ctx.fillText(sv[2],405+(30-ctx.measureText(sv[2]).width)/2,127)
		ctx.fillText(sv[3],445+(30-ctx.measureText(sv[3]).width)/2,127)

		ctx.fillText('Rank',200,167)
		let x = message.member.highestRole.name;
		ctx.fillText(x,275+(200-ctx.measureText(x).width)/2,167)

		canvas.createPNGStream().pipe(
			fs.createWriteStream('src/info.png').on("close",()=>{message.channel.send(new Discord.Attachment("src/info.png"))})
		)
	}

	try {
		req.get(message.author.avatarURL.replace('=2048','=256'),{encoding:null},(err,res)=> {
			ava.src = res.body
		})
	} catch (error) {
		console.log(error)
		return
	}

}