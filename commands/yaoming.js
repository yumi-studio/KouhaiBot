exports.run = (Discord,rdc,client,message,cmd) =>{
	let em = new Discord.RichEmbed();
	em.setImage('https://i.imgur.com/5218yLa.jpg');
	message.channel.send(em);
}