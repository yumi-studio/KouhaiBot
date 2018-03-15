exports.run = (Discord,rdc,client,message,cmd) =>{
	let list =[];
	let arg1 = cmd.split(" ")[0];
	let arg2 = cmd.substring(arg1.length+1);
	let sender = message.author;
	let perm =  message.member.permissions.FLAGS;
	let guild = message.guild;
	let channel = message.channel;
	switch(arg1){
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
		default:
			if(arg2 === null){
				del();
			}else{
				set();
			}
	}

	function set(){
		if(sender.id!==process.env.BOSS_ID && perm!=="ADMINISTRATOR") return;
		rdc.get("cmd"+guild.id,function(err,reply){
			if(reply===null) return;
			list = JSON.parse(reply.toString());
			let newc = {
				name: arg1, 
				content: arg2
			}
			let found = list.findIndex(m=>m.name===newc.name);
			if(found===-1){
				list.push(newc);
				channel.send("**"+arg1+"** is added.");
			}else{
				list.splice(found,1,newc);
				channel.send("**"+arg1+"** is modified.");
			}
			rdc.set("cmd"+guild.id,JSON.stringify(list),()=>{});
		});
	}

	function del(){
		if(sender.id!==process.env.BOSS_ID && perm!=="ADMINISTRATOR") return;
		rdc.get("cmd"+guild.id,function(err,reply){
			if(reply===null) return;
			list = JSON.parse(reply.toString());
			let found = list.findIndex(m=>m.name===arg1);
			if(found===-1) return;
			list.splice(found,1);
			rdc.set("cmd"+guild.id,JSON.stringify(list),()=>{
				channel.send("**"+arg1+"** is deleted.");
			});
		});
	}
}