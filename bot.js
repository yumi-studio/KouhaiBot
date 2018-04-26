/* global process */

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
var rdc = require('redis').createClient(process.env.REDIS_URL);

const prefix = '!';

client.on('ready', () => {
	client.user.setActivity('Yui-senpai w/ !help');
	console.log('bot is ready');
});

client.on('guildMemberAdd',member=>{
	let guild = member.guild;
	let channel = guild.channels.find(c=>{
		return c.type==="text" && c.permissionsFor(guild.me).has("SEND_MESSAGES");
	})
	if(channel===null) return;
	rdc.get("welcome"+guild.id,(err,reply)=>{
		if(reply===null) channel.send(`Have a great day, ${member} senpai`);
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

client.login(process.env.BOT_TOKEN);