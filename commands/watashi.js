exports.run = (Discord,rdc,client,message,cmd) =>{
	if(message.channel.type!=="text"){
		return
	}
	let req = require('request')
	let em = new Discord.RichEmbed()
	let name = message.author.username
	let sv = [message.member.joinedAt.getDate(),message.member.joinedAt.getMonth()+1,message.member.joinedAt.getFullYear()-2000]
	// let dc = ['Join discord',message.author.createdAt.getDate(),message.author.createdAt.getMonth()+1,message.author.createdAt.getFullYear()-2000]
	let fs = require("fs")
	let Canvas = require("../node_modules/canvas"),
	img = new Canvas.Image,
	ava = new Canvas.Image,
	canvas = Canvas.createCanvas(500,200),
	ctx = canvas.getContext("2d")
	img.src = fs.readFileSync('src/info-discord-card.png');
	ava.onload = function(){
		//draw avatar
		ctx.drawImage(ava,25,25,150,150)
		ctx.drawImage(img,0,0,500,200)

		//draw all text
		ctx.font = "20px 'Arial'"
		ctx.fillStyle = "#FFFFFF"
		ctx.globalAlpha = 0.85
		if(ctx.measureText(name).width>200){
			ctx.fillText(name.slice(0,9)+"...",270,47)
		}else{
			ctx.fillText(name,270,47)
		}
		let dt = client.user.createdAt.toDateString().split(" ");
		switch(dt[2]){
			case '01':	dt[2]='1st'; break;
			case '02':	dt[2]='2nd'; break;
			case '03':	dt[2]='3rd'; break;
			default:	dt[2]=parseInt(dt[2])+"th"; break;
		}
		let dtt = `${dt[1]},${dt[1]} ${dt[3]}`
		ctx.fillText(dtt,265+(210-ctx.measureText(dtt).width)/2,87)

		let x = message.member.highestRole.name;
		ctx.fillStyle = message.member.highestRole.hexColor;
		if(ctx.measureText(x).width>200){
			ctx.fillText(x.slice(0,9)+"...",270,127)
		}else{
			ctx.fillText(x,265+(210-ctx.measureText(x).width)/2,127)
		}

		ctx.fillStyle = "#FFFFFF"
		ctx.fillText(message.author.id,265+(210-ctx.measureText(message.author.id).width)/2,167)

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