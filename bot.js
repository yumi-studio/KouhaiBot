/* global process */

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

var rdc = require('redis').createClient(process.env.REDIS_URL);

const prefix = '!';
const bossId = process.env.BOSS_ID;

client.on('ready', () => {
	client.user.setActivity('Yui-senpai with love');
	console.log('bot is ready');
});

client.on('message', message => {
	var sender= message.author;
	var em = new Discord.RichEmbed();
	if(message.content.substring(0,1) === prefix && message.channel.type!=='dm'){
		var cmd = message.content.substring(1,message.content.length).split(' ');
		switch(cmd[0]){
			
			/*meme*/
			case 'hhh':
				em.setImage('https://i.imgur.com/ojjWsjK.jpg');
				message.channel.send(em);
				return;
			case 'pff':
				em.setImage('https://i.imgur.com/nacjQtW.jpg');
				message.channel.send(em);
				return;
			case 'ym':
				em.setImage('https://i.imgur.com/5218yLa.jpg');
				message.channel.send(em);
				return;
			
			/*--------------------------------*/
			/*Random a selection*/
			case 'roll':
				var opt = cmd[1].split('-');
				var num= opt.length;
				if(num>1){
					message.channel.send(opt[Math.floor(Math.random()*num)]);
				}
				return;
			/*Quote*/
			case 'quote':
				var guildId = message.guild.id;
				if(cmd[1]==='add'){
					
					/* Check permission */
					if(sender.id!==bossId){
						message.channel.send("You dont have permission to use this command.");
						return;
					}
					
					/*Create new quote*/
					var q ='';
					for(var i=3;i<cmd.length;i++){
						q = q +' '+ cmd[i];
					}
					rdc.hmset('quote'+guildId+cmd[2],q);
					message.channel.send("New quote **"+cmd[2]+"** is added.");
					return;
				}
				
				let quote= rdc.get('quote'+guildId+cmd[2]);
				message.channel.send(quote);
				return;
			/*Return id of an user*/
			case 'abcdef':
				if(sender.id!==bossId){
					message.channel.send('you dont have enough permission.');
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
				message.channel.send(em);
				return; 
			
			/*Invite the bot*/
			case 'inviteme':
				message.channel.send('https://discordapp.com/api/oauth2/authorize?client_id=413384938965172255&permissions=0&scope=bot');
				return;
				
			/*Play music*/
			/* case 'play':
				var link = cmd[1];
				var streamOptions = { seek: 0, volume: 1 };
				message.member.voiceChannel.join()
				  .then(connection => {
					const stream = ytdl(link, { filter : 'audioonly' });
					const dispatcher = connection.playStream(stream, streamOptions);
				  })
				  .catch(console.error);
				return; */
				
			/*Werewolve*/
			case 'masoi':{
				if(sender.id!==bossId){
					message.channel.send('you dont have enough permission.');
					return;
				}
				var cha= [];
				var role = 
				message.channel.send("Bắt đầu game ma sói, gõ **masoi join** để tham gia");
				while(true){
					client.on('message', gamemes =>{
						if(gamemes.content === cmd[0]+' join'){
							cha.push({
								name: gamemes.author.id
							});
						}
					});
				}
			}
			default:
				message.channel.send('Command not found');
		}	
	}
});

client.login(process.env.BOT_TOKEN);