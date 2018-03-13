exports.run = (Discord,rdc,client,message,cmd) =>{
	let list =[];
	let option = cmd.split(" ")[0];
	let sender = message.author;
	let perm =  message.member.permissions.FLAGS;
	let guild = message.guild;
	let channel = message.channel;
	switch(option){
		case "add":
			if(sender.id!==process.env.BOSS_ID || perm!=="ADMINISTRATOR") return;
			rdc.get("quote"+guild.id,function(err,reply){
				if(reply!==null){
					list = JSON.parse(reply.toString());
				}
				let newq = {
					name: cmd.split(" ")[1], 
					text: cmd.substring(option.length+cmd.split(" ")[1].length+2)
				}
				list.push(newq);
				rdc.set("quote"+guild.id,JSON.stringify(list),()=>{
					channel.send("**"+newq.name+"** is added.");
				});
			});
			return;
		case "del":
			
			return;
		case "change":
		
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