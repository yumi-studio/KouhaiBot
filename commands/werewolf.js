exports.run = (Discord,rdc,client,message,cmd) =>{
	let game ={
		stat: "0",
		player: []
	};
	let option = cmd.split(" ")[0];
	let sender = message.author;
	let perm =  message.member.permissions.FLAGS;
	let guild = message.guild;
	let channel = message.channel;
	function checkperm(){
		if(sender.id===process.env.BOSS_ID || perm==="ADMINISTRATOR") return true;
		return false;
	}
	switch(option){
		case "start":
			if(!checkperm()) return;
			game.stat="1";
			rdc.set("masoi"+guild.id,JSON.stringify(game),()=>{
				channel.send("Game start! Type **!join** to join");
			});
			break;
		case "end":
			if(!checkperm()) return;
			game.stat="0";
			rdc.set("masoi"+guild.id,JSON.stringify(game),()=>{
				channel.send("Game start! Type **!join** to join");
			});
			break;
		case "join":
		case "players":
		case "out":
	}
}