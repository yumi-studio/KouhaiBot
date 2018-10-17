const Discord = require('discord.js');
const rdc = require('redis').createClient(process.env.REDIS_URL);

exports.run = (client,message,cmd) =>{
	let list =[];
	let arg1 = cmd.split(" ")[0];
	let arg2 = cmd.substring(arg1.length+1);
	let sender = message.author;
	let guild = message.guild;
	let channel = message.channel;
	let pos
	switch(arg1){
		case "list":
			rdc.get("cmd"+guild.id,function(err,reply){
				if(reply===null)	return;
				list=JSON.parse(reply.toString());
				let listname ="";
				list.forEach(m => {listname=listname + ", "+m.name});
				listname=listname.substring(2);
				if(listname.length<1){
					channel.send("No custom command.");
				}else{
					channel.send("`"+listname+"`");
				}
			}); 
			return;
		default:
			if(arg2.length <1){
				del();
			}else{
				set();
			}
	}

	function set(){
		if(sender.id!=process.env.BOSS_ID){
			if(!message.member.permissions.hasPermission("ADMINISTRATOR")){
				return
			}
		}
		rdc.get("command",function(err,reply){
			list = JSON.parse(reply.toString());
			let newc = {
				name: arg1, 
				content: arg2
			}
			pos = list.findIndex(m=>m.id==guild.id);
			let found = list[pos].list.findIndex(m=>m.name==newc.name)
			if(found==-1){
				list[pos].list.push(newc);
				channel.send("`"+arg1+"` is added.");
			}else{
				list[pos].list.splice(found,1,newc);
				channel.send("`"+arg1+"` is modified.");
			}
			rdc.set("command",JSON.stringify(list),()=>{});
		});
	}

	function del(){
		if(sender.id!=process.env.BOSS_ID){
			if(!message.member.permissions.hasPermission("ADMINISTRATOR")){
				return
			}
		}
		rdc.get("command",function(err,reply){
			list = JSON.parse(reply.toString());
			pos = list.findIndex(m=>m.id==guild.id)
			let found = list[pos].list.findIndex(m=>m.name==arg1);
			if(found==-1) return;
			list[pos].list.splice(found,1);
			rdc.set("command",JSON.stringify(list),()=>{
				channel.send("`"+arg1+"` is deleted.");
			});
		});
	}
}