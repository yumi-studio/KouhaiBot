exports.run = (Discord,rdc,client,message,args) =>{
	let mt = message.mentions.members.first().displayName;
	message.channel.send(mt);
	if(mt === null){
		message.channel.send("Error")
		console.log(mt);
		return;
	}
	let text = `suck ${mt}`;
	var fs = require("fs");
	var Canvas = require('../node_modules/canvas');
	var img = new Canvas.Image;
	try{
		img.src = fs.readFile("../src/hamlon.png");
		console.log("loaded image")
	}catch(err){
		console.log(err);
	}

	const canvas = Canvas.createCanvas(img.width,img.height);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0, img.width, img.height);

	ctx.font = '30px arial';
	var len = ctx.measureText(text).width;
	ctx.fillText(text, (img.width-len)/2 , 300);
	
	canvas.createPNGStream().pipe(
		fs.createWriteStream('../src/hl.png').on("close",()=>{message.channel.send(new Discord.Attachment("../src/hl.png"))})
	)
}