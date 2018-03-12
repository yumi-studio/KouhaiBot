exports.run = (Discord,rdc,client,message,cmd) =>{
	let list = cmd.split("-");
	let num = list.lenght;
	if(num>0){
		message.channel.send(list[Math.floor(Math.random()*num)]);
	}
}