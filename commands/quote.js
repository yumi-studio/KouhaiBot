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
			rdc.get("quote"+guild.id,function(err,reply){
				if(reply!==null){
					list = JSON.parse(reply.toString());
				}
				if(cmd.indexOf("|")===-1) return;
				let newq = {
					name: cmd.substring(option.length+1).split("|")[0], 
					text: cmd.substring(cmd.split("|")[0].length+2)
				}
				let found = list.find(m=>m.name===newq.name);
				if(found!==undefined){
					channel.send("**"+newq.name+"** quote is in database. Please delete it before add new one.");
					return;
				}
				list.push(newq);
				rdc.set("quote"+guild.id,JSON.stringify(list),()=>{
					channel.send("**"+newq.name+"** is added.");
				});
			});
			return;
		case "del":
			if(sender.id!==process.env.BOSS_ID && perm!=="ADMINISTRATOR") return;
			rdc.get("quote"+guild.id,function(err,reply){
				if(reply!==null){
					list = JSON.parse(reply.toString());
				}else{
					return;
				}
				let found = list.findIndex(m=>m.name===cmd.substring(option.length+1));
				if(found===-1) return;
				list.splice(found,1);
				rdc.set("quote"+guild.id,JSON.stringify(list),()=>{
					channel.send("**"+list[found].name+"** is deleted.");
				});
			});
			return;
		case "list":
			rdc.get("quote"+guild.id,function(err,reply){
				if(reply===null)	return;
				list=JSON.parse(reply.toString());
				let listname ="";
				list.forEach(m => {listname=listname + ", "+m.name});
				listname=listname.substring(2);
				channel.send("`"+listname+"`");
			});
			return;
		default:
			rdc.get("quote"+guild.id,function(err,reply){
				if(reply===null)	return;
				list=JSON.parse(reply.toString());
				let found = list.find(m => m.name===option);
				if(found===undefined) return;
				let em = new Discord.RichEmbed();
				em.setTitle("**"+found.name+"**");
				em.setDescription('_"'+found.text+'"_');
				em.setColor(Math.floor(Math.random()*16777216));
				channel.send(em);
			});
	}
}