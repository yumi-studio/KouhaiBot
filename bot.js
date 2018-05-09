/* global process */

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const yt = require('ytdl-core');
var rdc = require('redis').createClient(process.env.REDIS_URL);

const prefix = '!';

client.on('ready', () => {
	client.user.setActivity('Yui-senpai w/ !help');
	console.log('bot is ready');
});

client.on('guildMemberAdd',member=>{
	if(member.bot) return;
	let guild = member.guild;
	let channel = guild.channels.find(c=>{
		return c.type==="text" && c.permissionsFor(guild.me).has("SEND_MESSAGES");
	})
	if(channel===null) return;
	rdc.get("welcome"+guild.id,(err,reply)=>{
		if(reply===null){
			channel.send(`Have a great day, ${member} senpai`);
			return;
		}
		let list = JSON.parse(reply.toString());
		let num = list.length;
		if(num>0){
			num = Math.floor(Math.random()*num);
			let x = list[num].replace("@user",`<@${member.id}>`);
			channel.send(x);
		}
	});
});

client.on('message', message => {
	if(message.author.bot) return;
	if(message.content.substring(0,1) !== prefix || message.channel.type==='dm') return;
	const cmd = message.content.substring(1).split(" ")[0];
	const args = message.content.substring(cmd.length+2);
	try{
		let cmdDir = "./commands/"+cmd+".js";
		let cmdFile = require(cmdDir);
		cmdFile.run(Discord,rdc,client,message,args);
	}catch(err){
		/*Read custom commands */
		rdc.get("cmd"+message.guild.id,function(err,reply){
			if(reply===null) return;
			let custom = JSON.parse(reply.toString());
			let found = custom.find(m=> m.name===cmd);
			let em = new Discord.RichEmbed();
			if(found!==undefined){
				if(found.content.startsWith("https://") || found.content.startsWith("http://")){
					em.setImage(found.content,200);
				}else{
					em.setDescription(found.content);
				}
				message.channel.send(em);
				return;
			}
		});
	}	
});

client.on('message', message=>{
	if(message.content.substring(0,5)=== prefix+'chửi'){
		let chui = message.content.substring(6);
		if(chui===null) return;
		let Canvas = require('canvas');
		let img = new Canvas.Image;
		img.src = fs.readFileSync('src/hamlon.png');
		let canvas = Canvas.createCanvas(img.width,img.height);
		let ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0, img.width, img.height);

		ctx.font = '30px arial';
		ctx.fillStyle = 'rgba(255,255,255,1)'
		let len = ctx.measureText(chui).width;
		ctx.fillText(chui, (img.width-len)/2 , 225);
		
		canvas.createPNGStream().pipe(
			fs.createWriteStream('src/hl.png').on("close",()=>{message.channel.send(new Discord.Attachment("src/hl.png"))})
		)
	}

});
// client.on('message', message=>{
// 	if(!message.content.startsWith(prefix)) return;
// 	if (!message.guild) return;
//   	if (message.content.substring(0,5) === prefix+'play') {
// 		var yturl = message.content.substring(6);
// 		if (message.member.voiceChannel) {
// 		message.member.voiceChannel.join()
// 			.then(connection => {
// 				console.log('I have successfully connected to the channel!');
// 				const dispatcher = connection.playStream(
// 					yt(yturl,{
// 						audioonly: true
// 					})
// 				);
// 				dispatcher.on('end',()=>{message.member.voiceChannel.leave()});
// 			})
// 			.catch(console.log);
// 		} else {
// 		console.log('You need to join a voice channel first!');
// 		}
//   	}
// });


client.login(process.env.BOT_TOKEN);