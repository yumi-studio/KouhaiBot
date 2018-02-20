/* global process */

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const prefix = '!';
const bossId = process.env.BOSS_ID;

client.on('ready', () => {
	client.user.setActivity('Yui-senpai with love');
	console.log('bot is ready');
});

rdc.on('connect', function() {
    console.log('redis database connected');
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
			// /*Quote*/
			// /* case 'quote':
				// var objq=[];
				// var guildId = message.guild.id;
				// objq = rdc.hgetall(bossId+'quote'+guildId);
					
				// if(cmd[1]==='add'){
					
					// /*Check permission*/
				// /* 	if(sender.id!==bossId){
						// message.channel.send("You dont have permission to use this command.");
						// return;
					// }
					
					// /*Create new quote*/
					// var q ='';
					// for(var i=3;i<cmd.length;i++){
						// q = q +' '+ cmd[i];
					// }
					// var newobj = {
						// name: cmd[2],
						// text: q
					// };
					// objq.push(newobj);
					// rdc.del(bossId+'quote'+guildId);
					// rdc.hmset(bossId+'quote'+guildId,objq);
					// message.channel.send("New quote **"+newobj.name+"** is added.");
					// return;
				// }
				
				// for(var j=0;j<objq.length;j++){
					// if(cmd[1]===objq[j].name){
						// em.setTitle("**"+cmd[1]+"**");
						// em.setDescription("_"+objq[j].text+"_");
						// message.channel.send(em);
						// return;
					// }
				// }
				//return;
			/*Return id of an user*/
			case 'abcdef':
				if(sender.id!==bossId){
					message.channel.send('you dont have enough permission.');
					return;
				}
				sender.send(message.mentions.users.first().username+':'+message.mentions.users.first().id);
				return;
			
			/*Return some information of mentioned member*/
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
			default:
				message.channel.send('Command not found');
		}	
	}
});

client.login(process.env.BOT_TOKEN);