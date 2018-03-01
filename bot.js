/* global process */

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

var rdc = require('redis').createClient(process.env.REDIS_URL);
var Game = {
		stat: 0,
		Player: []
	}
const prefix = '!';
const bossId = process.env.BOSS_ID;

function isboss(x){
	if(x===bossId){
		return true;
	}
	return false;
}

client.on('ready', () => {
	client.user.setActivity('Yui-senpai with love');
	console.log('bot is ready');
});

client.on('message', message => {
	var sender= message.author;
	var guild = message.guild;
	var channel = message.channel;
	var content = message.content;
	var em = new Discord.RichEmbed();
	if(content.substring(0,1) === prefix && channel.type!=='dm'){
		var cmd = content.substring(1,message.content.length).split(' ');
		switch(cmd[0]){
			
			/*meme*/
			case 'hhh':
				em.setImage('https://i.imgur.com/ojjWsjK.jpg');
				channel.send(em);
				return;
			case 'pff':
				em.setImage('https://i.imgur.com/nacjQtW.jpg');
				channel.send(em);
				return;
			case 'ym':
				em.setImage('https://i.imgur.com/5218yLa.jpg');
				channel.send(em);
				return;
			
			/*--------------------------------*/
			/*Random a selection*/
			case 'roll':
				var opt = cmd[1].split('-');
				var num= opt.length;
				if(num>1){
					channel.send(opt[Math.floor(Math.random()*num)]);
				}
				return;
			/*Quote*/
			case 'quote':
				var objq =[];
				if(cmd[1]==='add'){
					/* Check permission */
					if(sender.id===bossId || message.member.permissions.FLAGS==='ADMINISTRATOR'){
						rdc.get("quote"+guild.id,function(err,reply){
							if(reply!==null){
								objq = JSON.parse(reply.toString());
							}
						});
						
						/*Create new quote*/
						var q ='';
						for(var i=3;i<cmd.length;i++){
							q = q +' '+ cmd[i];
						}
						let newobj = {
							name: cmd[2],
							text: q
						};
						
						objq.push(newobj);
						objq = JSON.stringify(objq);
						rdc.set('quote'+guild.id,objq,function(){
							channel.send("New quote **"+newobj.name+"** is added.");
						});
					}else{
						channel.send("You dont have permission to use this command.");
					}
					
					return;
				}
				
				rdc.get('quote'+guild.id,function(err,reply){
					if(reply!==null){
						objq = JSON.parse(reply.toString());
						var found = objq.find(function(element){
							return element.name===cmd[1];
						});
						if(found!==undefined){
							em.setTitle("**"+found.name+"**");
							em.setDescription('_"'+found.text+'"_');
							em.setColor(Math.floor(Math.random()*16777216));
							channel.send(em);
						}
					}else{
						channel.send("This server dont have any quote");
					}
				});
				return;
			/*Return id of an user*/
			case 'abcdef':
				if(sender.id!==bossId){
					channel.send('you dont have enough permission.');
					return;
				}
				sender.send(message.mentions.users.first().username+':'+message.mentions.users.first().id);
				return;
			
			/*Return some information of member*/
			case 'watashi?':
				em.setColor(Math.floor(Math.random()*16777216));
				em.setTitle('**'+message.member.displayName+'**');
				em.addField('**Realname** ',sender.username);
				em.addBlankField();
				em.addField('**Joined Time**',sender.createdAt);
				em.setThumbnail(sender.avatarURL);
				channel.send(em);
				return; 
			
			/*Invite the bot*/
			case 'inviteme':
				channel.send('https://discordapp.com/api/oauth2/authorize?client_id=413384938965172255&permissions=0&scope=bot');
				return;
				
			case "name":
				if(isboss(sender.id)){
					client.user.setUsername(cmd[1]);
				}
				return;
				
			/*Werewolve*/
			case "masoi":{
				if(!isboss(sender.id)){
					channel.send('you dont have enough permission.');
					return;
				}else{
					if(channel.name!=="game"){
						channel.send("Please using #game channel");
						return;
					}
				}
				
				rdc.set("masoi"+guild.id,JSON.stringify(Game),function(){
					channel.send("Game start! Type **!join** to join");
				});
				return;
			}
			case "join":
				rdc.get("masoi"+guild.id,function(err,reply){
					if(reply!==undefined){
						Game = JSON.parse(reply.toString());
						if(Game.stat===1){
							Game.Player.push({
								id: sender.id,
								role: "none"
							});
							rdc.set("masoi"+guild.id,JSON.stringify(Game),function(){
								channel.send(message.member.displayName+" joined");
							});
						}
					}
				};
				return;
			case "players":
				rdc.get("masoi"+guild.id,function(err,reply){
					if(reply!==undefined){
						Game = JSON.parse(reply.toString());
						for(var a =0;a<Game.Player.length;a++){
							em.addField(""+(a+1)+"."+guild.members.find("id",Game.Player[a].id).displayName,"");
						}
					}
				};
				return;
			}	
	}
});

client.login(process.env.BOT_TOKEN);