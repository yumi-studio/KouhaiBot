const Discord = require('discord.js');

exports.run = (client,message,cmd) =>{
	let em = new Discord.RichEmbed();
	em.setImage('https://i.imgur.com/nacjQtW.jpg');
	message.channel.send(em);
}