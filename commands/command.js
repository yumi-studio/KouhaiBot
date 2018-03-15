exports.run = (Discord,rdc,client,message,cmd) =>{
	let list =[];
	let option = cmd.split(" ")[0];
	let sender = message.author;
	let perm =  message.member.permissions.FLAGS;
	let guild = message.guild;
	let channel = message.channel;
	switch(option){
		case "add":
			if(sender.id!==process.env.BOSS_ID && perm!=="ADMINISTRATOR") return;
			rdc.get("cmd"+guild.id,function(err,reply){
				if(reply!==null){
					list = JSON.parse(reply.toString());
				}
				if(cmd.indexOf("|")===-1) return;
				let newc = {
					name: cmd.substring(option.length+1).split("|")[0], 
					content: cmd.substring(cmd.split("|")[0].length+1)
				}
				let found = list.find(m=>m.name===newc.name);
				if(found!==undefined){
					channel.send("**"+newc.name+"** is in database. Please delete it before add new one.");
					return;
				}
				list.push(newc);
				rdc.set("cmd"+guild.id,JSON.stringify(list),()=>{
					channel.send("**"+newc.name+"** is added.");
				});
			});
			return;
		case "del":
			if(sender.id!==process.env.BOSS_ID && perm!=="ADMINISTRATOR") return;
			rdc.get("cmd"+guild.id,function(err,reply){
				if(reply!==null){
					list = JSON.parse(reply.toString());
				}else{
					return;
				}
				let found = list.findIndex(m=>m.name===cmd.substring(option.length+1));
				if(found===-1) return;
				list.splice(found,1);
				rdc.set("cmd"+guild.id,JSON.stringify(list),()=>{
					channel.send("**"+cmd.substring(option.length+1)+"** is deleted.");
				});
			});
			return;
		case "list":
			rdc.get("cmd"+guild.id,function(err,reply){
				if(reply===null)	return;
				list=JSON.parse(reply.toString());
				let listname ="";
				list.forEach(m => {listname=listname + ", "+m.name});
				listname=listname.substring(2);
				channel.send("`"+listname+"`");
			});
			return;
	}
}