exports.run = (Discord,rdc,client,message,cmd) =>{
	let em = new Discord.RichEmbed();
	em.setTitle(`You don't know what you can do with me,${message.author.username} senpai`);
	em.setDescription("Here is something Senpai can do with me (◠﹏◠✿)");
	em.addBlankField();
	em.addField("inviteme",`	(✿┛◉Д◉)┛彡┻━┻  Senpai want to see me Hand-In-Hand with another people`);
	em.addField("roll","Senpai, do you want to play a guess game? ★~(◡﹏◕✿)");
	em.addField("watashi",	`	I will show your information, Senpai (●´ω｀●)`);
	em.addField("werewolf",	`	Yui-oniichan is working with this thing, so please wait (◕ω◕✿)`);
	em.addField("command",`
		This can create custom command, delete custom command or modify exist command (∪ ◡ ∪)
		(´･ω･\`) Let's take a look. 
		Ex: I want to create **senpai** command, first I need type _!command senpai somethingsweetie_
			then if **senpai** is a custom command, senpai can edit it with _!command senpai otherthingsweetie_
			if **senpai** is not needed anymore, senpai type _!command senpai_ with nothing sweetie and **senpai** will be deleted.
			But note that: ONLY Yui-oniichan or Senpai's permission is ADMINISTRATOR can create, delete or modify ✿◕ ‿ ◕✿
			Okay so how can senpai use it? too ez, just type **senpai** and senpai will see "somethingsweetie" in chat (◡‿◡✿)
	`);
	message.author.send(em);
}