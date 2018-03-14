exports.run = (Discord,rdc,client,message,cmd) =>{
	if(message.author.id!==process.env.BOSS_ID) return;
	client.user.setUsername(cmd);
}