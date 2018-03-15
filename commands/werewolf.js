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
			rdc.get("masoi"+guild.id,(err,reply)=>{
				if(reply!==undefined){
					game = JSON.parse(reply.toString());
					if(game.stat==="0") return;
					game.player.push({
						id: sender.id,
						role: ""
					});
					rdc.set("masoi"+guild.id,JSON.stringify(game),()=>{
						channel.send(`${message.member.displayName}-sempai joined`);
					})
				}
			});
			break;
		case "players":
			rdc.get("masoi"+guild.id,(err,reply)=>{
				if(reply===undefined) return;
				game = JSON.parse(reply.toString());
				for(let a = 0;a<game.player.length;a++){
					em.addField(""+(a+1)+"."+guild.members.find("id",game.player[a].id).displayName);
				}
				channel.send(em);
			});
			break;
		case "out":
			rdc.get("masoi"+guild.id,(err,reply)=>{
				if(reply===null) return;
				game = JSON.parse(reply.toString());
				let found = game.player.findIndex(m => m.id===sender.id);
				if(found===-1) return;
				game.player.splice(found,1);
				rdc.set("masoi"+guild.id,JSON.stringify(game),()=>{
					channel.send(`${message.member.displayName} is out.`);
				});
			});
			break;
	}
}