exports.run = (Discord,rdc,client,message,cmd) =>{
	let em = new Discord.RichEmbed();
	em.setColor(Math.floor(Math.random()*16777216));
	em.setTitle('**'+message.member.displayName+'**');
	em.addField('**Realname** ',message.author.username);
	em.addBlankField();
	em.addField('**Joined Time**',message.author.createdAt);
	em.setThumbnail(message.author.avatarURL);
	message.channel.send(em);
}