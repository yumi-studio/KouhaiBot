const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!';
client.on('ready', () => {
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
				var numOpt= opt.length;
				
				return;
			default:
				message.channel.send('Command not found');
		}	
	}
});
client.login(process.env.BOT_TOKEN);