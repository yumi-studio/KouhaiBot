/* global process */

const Discord = require('discord.js');
const request = require('request');
const client = new Discord.Client();
const fs = require('fs');
var rdc = require('redis').createClient(process.env.REDIS_URL);

const prefix = '!';

client.on('ready', () => {
	client.user.setActivity('Yui-senpai with love');
	console.log('bot is ready');
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
		console.log(err);
	}
			
			// /*Return some information of member*/
			// case 'watashi?':
				// em.setColor(Math.floor(Math.random()*16777216));
				// em.setTitle('**'+message.member.displayName+'**');
				// em.addField('**Realname** ',sender.username);
				// em.addBlankField();
				// em.addField('**Joined Time**',sender.createdAt);
				// em.setThumbnail(sender.avatarURL);
				// channel.send(em);
				// return; 
			
			// /*Invite the bot*/
			// case 'inviteme':
				// channel.send('https://discordapp.com/api/oauth2/authorize?client_id=413384938965172255&permissions=0&scope=bot');
				// return;
				
			// case "name":
				// if(isboss(sender.id)){
					// client.user.setUsername(cmd[1]);
				// }
				// return;
				
			// /*Werewolve*/
			// case "masoi":
				// if(!isboss(sender.id)){
					// return;
				// }else{
					// if(channel.name!=="game"){
						// channel.send("Please using #game channel");
						// return;
					// }
				// }
				// Game.stat=1;
				// rdc.set("masoi"+guild.id,JSON.stringify(Game),function(){
					// channel.send("Game start! Type **!join** to join");
				// });
				// return;
				
			// case "msjoin":
				// rdc.get("masoi"+guild.id,function(err,reply){
					// if(reply!==undefined){
						// Game = JSON.parse(reply.toString());
						// if(Game.stat===1){
							// Game.Player.push({
								// id: sender.id,
								// role: "none"
							// });
							// rdc.set("masoi"+guild.id,JSON.stringify(Game),function(){
								// channel.send(message.member.displayName+"-sempai joined");
							// });
						// }
					// }
				// });
				// return;
				
			// case "msplayers":
				// if(!isboss(sender.id)){
					// return;
				// }
				// rdc.get("masoi"+guild.id,function(err,reply){
					// if(reply!==undefined){
						// Game = JSON.parse(reply.toString());
						// for(var a =0;a<Game.Player.length;a++){
							// em.addField(""+(a+1)+"."+guild.members.find("id",Game.Player[a].id).displayName,"Role:"+Game.Player[a].role);
						// }
						// channel.send(em);
					// }
				// });
				// return;
			// case "masoiend":
				// if(!isboss(sender.id)){
					// return;
				// }
				// rdc.set("masoi"+guild.id,JSON.stringify(Game),function(){
					// channel.send("Game ma soi ended");
				// });
			// case "help":
				// sender.send("This command is developing");
				// return;
				
			// /*Add custom command*/
			// case "addcmd":
				// if(sender.id===bossId || message.member.permissions.FLAGS==='ADMINISTRATOR'){
					// rdc.get("cmd"+guild.id,function(err,reply){
						// if(reply!==null){
							// custom = JSON.parse(reply.toString());
							// custom.push({
								// tag: cmd[1],
								// content: cmd[2]
							// });
							// rdc.set("cmd"+guild.id,JSON.stringify(custom),function(){});
						// }
					// });
				// }
				// return;
			// /*Delete a custom command*/
			// case "delcmd":
				// if(sender.id===bossId || message.member.permissions.FLAGS==='ADMINISTRATOR'){
					// rdc.get("cmd"+guild.id,function(err,reply){
						// if(reply!==null){
							// custom = JSON.parse(reply.toString());
							// var i = custom.findIndex(function(element){
								// return element.tag===cmd[1];
							// });
							// if(i===-1)	return;
							// custom.splice(i,1);
							// rdc.set("cmd"+guild.id,JSON.stringify(custom),function(){});
						// }
					// });
				// }
				// return;
			// /*Delete all custom commands*/
			// case "delallcmd":
				// if(sender.id===bossId || message.member.permissions.FLAGS==='ADMINISTRATOR'){
					// custom= JSON.stringify(custom);
					// rdc.set("cmd"+guild.id,custom,function(err,reply){
						// channel.send("All custom commands is deleted");
					// });
				// }
				// return;
			// /*Show list of custom commands*/
			// case "customcmd":
				// rdc.get("cmd"+guild.id,function(err,reply){
					// if(reply!==null){
						// channel.send(reply.toString());
					// }
				// });
				// return;
			
			// /**/
			// default:
				// rdc.get("cmd"+guild.id,function(err,reply){
					// if(reply!==null){
						// custom = JSON.parse(reply.toString());
						// var found = custom.find(function(element){
							// return element.tag===cmd[0];
						// });
						// if(found!==undefined){
							// if(found.content.startsWith("https://") || found.content.startsWith("http://")){
								// em.setImage(found.content);
							// }else{
								// em.setDescription(found.content);
							// }
							// channel.send(em);
							// return;
						// }
					// }
				// });
		// }	
});

client.login(process.env.BOT_TOKEN);