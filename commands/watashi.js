exports.run = (Discord,rdc,client,message,cmd) =>{
	let em = new Discord.RichEmbed();
	em.setColor(Math.floor(Math.random()*16777216));
	em.setTitle('**'+message.member.displayName+'**');
	em.addField('**Realname** ',message.author.username,true);
	em.addField('**Join discord**',message.author.createdAt.getDate()+"/"+message.author.createdAt.getMonth()+"/"+message.author.createdAt.getFullYear(),true);
	em.addField(`**Join ${message.guild.name}**`,message.member.joinedAt.getDate()+"/"+message.member.joinedAt.getMonth()+"/"+message.member.joinedAt.getFullYear());
	em.setThumbnail(message.author.avatarURL);
	message.channel.send(em);
}