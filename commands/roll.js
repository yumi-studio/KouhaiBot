exports.run = (client,message,cmd) =>{
	let list = cmd.split("-");
	let num = list.length;
	if(num>0){
		message.channel.send(list[Math.floor(Math.random()*num)]);
	}
}