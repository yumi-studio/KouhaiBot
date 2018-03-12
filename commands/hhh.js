exports.run = (client,message,cmd) =>{
	var Discord = require("../discord.js/");
	var em = new Discord.RichEmbed();
	em.setImage('https://i.imgur.com/ojjWsjK.jpg');
	message.channel.send(em);
}