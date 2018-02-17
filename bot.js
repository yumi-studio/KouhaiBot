const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const prefix = '!';
client.on('ready', () => {
	client.user.setActivity('Yui-senpai with love');
	client.user.set
	console.log('I am ready!');
});

client.on('message', message => {
	if(message.content.substring(0,1) === prefix){
		var cmd = message.content.substring(1,message.content.length).split(' ');
		var em = new Discord.RichEmbed();
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
			case 'quote':
				var file = require('./quote.json');
				var count=0;
				while(count!==file.length){
					if(file[count].name===cmd[1]){
						message.channel.send(file[count].text);
						break;
					}
					count++;
				}
				return;
			case 'suck':
			case 'show':
				if(cmd.length === 1){
					message.channel.send('Please tag someone with ```@username```');
				}else{
					message.channel.send(message.mentions.users.first[0].id);
				}
			default:
				message.channel.send('Command not found');
		}	
	}
});
client.login(process.env.BOT_TOKEN);