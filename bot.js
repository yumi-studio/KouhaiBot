const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const prefix = '!';
const bossId = process.env.BOSS_ID;
client.on('ready', () => {
	client.user.setActivity('Yui-senpai with love');
	console.log('I am ready!');
});

client.on('guildMemberAdd', member =>{
	const channel = member.guild.find('name','member-log');
	if(!channel) return;
	channel.send('Welcome to '+member.guild.name+',${member} senpai');
});

client.on('message', message => {
	var sender= message.author;
	var em = new Discord.RichEmbed();
	if(message.content.substring(0,1) === prefix && message.channel.type!=='dm'){
		var cmd = message.content.substring(1,message.content.length).split(' ');
		switch(cmd[0]){
			
			/*meme*/
			case 'hhh':
				em.setImage('https://i.imgur.com/ojjWsjK.jpg');
				message.channel.send(em);
				return;
			case 'pff':
				em.setImage('https://i.imgur.com/nacjQtW.jpg');
				message.channel.send(em);
				return;
			case 'yaoming':
				em.setImage('https://i.imgur.com/5218yLa.jpg');
				message.channel.send(em);
				return;
			
			/*--------------------------------*/
			case 'roll':
				var opt = cmd[1].split('-');
				var num= opt.length;
				if(num>1){
					message.channel.send(opt[Math.floor(Math.random()*num)]);
				}
				return;
			case 'quote':
				var objq=[];
				if(cmd[1]==='add'){
					if(sender.id!==bossId){
						message.channel.send("You dont have permission to use this command.");
						return;
					}
					
					try{
						objq = JSON.parse(fs.readFileSync("./quote"+message.guild.id+".json","utf8"));
					}catch(err){
						fs.writeFile("./quote"+message.guild.id+".json",JSON.stringify(objq),"utf8",function(err){
							if(err){
								console.log(err);
							}
						}
						console.log("created file");
					}
					
					var q ='';
					for(var i=3;i<cmd.length;i++){
						q = q +' '+ cmd[i];
					}
					var newobj = {
						name: cmd[2],
						text: q
					};
					objq.push(newobj);
					fs.writeFile('./quote.json',JSON.stringify(objq),(err)=>console.error);
					return;
				}
				for(var j=0;j<objq.length;j++){
					if(cmd[1]===objq[j].name){
						em.setTitle(cmd[1]);
						em.setDescription(objq[j].text);
						message.channel.send(em);
						return;
					}
				}
				return;
			case 'abcdef':
				if(sender.id!==bossId){
					message.channel.send('you dont have enough permission.');
					return;
				}
				sender.send(message.mentions.users.first().username+':'+message.mentions.users.first().id);
				return;
			case 'watashi?':
				em.setColor(Math.floor(Math.random()*16777216));
				em.setTitle('**'+message.member.displayName+'**');
				em.addField('**Realname** ',sender.username);
				em.addBlankField();
				em.addField('**Joined Time**',sender.createdAt);
				em.setThumbnail(sender.avatarURL);
				message.channel.send(em);
				return; 
			case 'inviteme':
				message.channel.send('https://discordapp.com/api/oauth2/authorize?client_id=413384938965172255&permissions=0&scope=bot');
				return;
			default:
				message.channel.send('Command not found');
		}	
	}
});
client.login(process.env.BOT_TOKEN);