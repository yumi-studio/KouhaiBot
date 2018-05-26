let fs = require("fs")
let Canvas = require('canvas')

exports.run = (Discord,rdc,client,message,args) =>{
	let mt = message.mentions.members.first().displayName;
	if(mt === null){
		message.channel.send(">_< you must tag someone, senpai!")
		console.log(mt);
		return;
	}
	let text = `${mt} suck`
	let img = new Canvas.Image
	try{
		img.src = fs.readFileSync("src/hamlon.png")

	}catch(err){
		console.log(err)
		return
	}

	let canvas = Canvas.createCanvas(img.width,img.height)
	let ctx = canvas.getContext('2d')
	ctx.drawImage(img, 0, 0, img.width, img.height)

	ctx.font = '30px arial';
	ctx.fillStyle = 'rgba(255,255,255,1)'
	let len = ctx.measureText(text).width;
	ctx.fillText(text, (img.width-len)/2 , 225);
	
	canvas.createPNGStream().pipe(
		fs.createWriteStream('src/hl.png').on("close",()=>{message.channel.send(new Discord.Attachment("src/hl.png"))})
	)
}