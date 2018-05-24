exports.run = (Discord,rdc,client,message,cmd) =>{
	if(message.channel!=="TextChannel") return
	let req = require('request')
	let em = new Discord.RichEmbed()
	let name = message.author.username
	let dcjoin = `Join discord:${message.member.joinedAt.getDate()}/${message.member.joinedAt.getMonth()+1}/${message.member.joinedAt.getFullYear()}`
	let svjoin = `Join server:${message.author.createdAt.getDate()}/${message.author.createdAt.getMonth()+1}/${message.author.createdAt.getFullYear()}`
	let fs = require("fs"),
	Canvas = require("../node_modules/canvas"),
	img = new Canvas.Image,
	ava = new Canvas.Image,
	canvas = Canvas.creatCanvas(500,200),
	ctx = canvas.getContext("2d")
	try {
		// img.src = fs.readFileSync("src/info.png")
		req.get(message.author.avatarURL.split("?")[0],{encoding:null},(err,res)=>{
			ava.src = res.body
		})
	} catch (error) {
		console.log(error)
		return
	}
	ava.onload = ()=>{
		console.log(ava)
		ctx.drawImage(ava,25,25,150,150)
		ctx.font = "30px Arial"
		ctx.fillStyle = "rgba(255,255,255,1)"
		ctx.fillText(name,300,25,200)
		ctx.fillText(dcjoin,300,50)
		ctx.fillText(svjoin,300,75)
		canvas.createPNGStream().pipe(
			fs.createWriteStream('src/info.png').on("close",()=>{message.channel.send(new Discord.Attachment("src/info.png"))})
		)
	}
}