const Discord = require('discord.js');

exports.run = (client,message,cmd) =>{
	let em = new Discord.RichEmbed();
	em.setTitle("KOUHAIBOT COMMANDS LIST");
	em.setURL("https://yumichannel.github.io/discord");
	message.channel.send(em);
}