const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const prefix = '!';
const bossId = process.env.BOSS_ID;
client.on('ready', () => {
	client.user.setActivity('Yui-senpai with love');
	console.log('I am ready!');
});

client.on('message', message => {
	var sender= message.author;
	var em = new Discord.RichEmbed();
	if(message.content.substring(0,1) === prefix){
		var cmd = message.content.substring(1,message.content.length).split(' ');
		switch(cmd[0]){
			case 'hhh':
				em.setImage('https://i.imgur.com/ojjWsjK.jpg');
				message.channel.send(em);
				return;
			case 'pff':
				em.setImage('https://i.imgur.com/nacjQtW.jpg');
				message.channel.send(em);
				return;
			case 'roll':
				var opt = cmd[1].split('-');
				var num= opt.length;
				if(num>1){
					message.channel.send(opt[Math.floor(Math.random()*num)]);
				}
				return;
			/* case 'quote':
				var file = require('./quote.json');
				var count=0;
				while(count!==file.length){
					if(file[count].name===cmd[1]){
						message.channel.send(file[count].text);
						break;
					}
					count++;
				}
				return; */
			case 'abcdef':
				if(sender.id!==bossId){
					message.channel.send('you dont have enough permission.');
					return;
				}
				sender.send(message.mentions.users.first().username+':'+message.mentions.users.first().id);
				return;
			case 'watashi?':
				em.setColor(Math.floor(Math.random()*16777216));
				em.setThumbnail(sender.avatarUrl);
				em.addField('**Realname** ',sender.username);
				em.addField('**Joined Time**',sender.createdAt);
				message.channel.send(em);
				return;
			default:
				message.channel.send('Command not found');
		}	
	}
});
client.login(process.env.BOT_TOKEN);