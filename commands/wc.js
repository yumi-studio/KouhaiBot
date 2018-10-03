const Discord = require('discord.js');
const rdc = require('redis').createClient(process.env.REDIS_URL);

exports.run = (client,message,cmd) =>{
    if(cmd.lenght<=0) return;
    let opt = cmd.split(" ")[0];
    let wcmsg = cmd.substring(2);
    let guild = message.guild;
    let channel = message.channel;
    let sender = message.author;
    let list=[];
    if(sender.id!=process.env.BOSS_ID && message.member.permissions.toArray().indexOf("ADMINISTRATOR")==-1) return;
    rdc.get("welcome"+guild.id,(err,reply)=>{
        if(reply!==null){
            list = JSON.parse(reply.toString());
        }
        switch(opt){
            case "a": //add new
                if(wcmsg.lenght<=0) return;
                list.push(wcmsg);
                rdc.set("welcome"+guild.id,JSON.stringify(list),()=>{
                    channel.send("Added new greeting message! Check greeting list with **!wc l**");
                });
                return;
            case "x": //delete all
                list = [];
                rdc.set("welcome"+guild.id,JSON.stringify(list),()=>{});
                return;
            case "d": //delete single
                try {
                    let found = list.findIndex(m=>m===wcmsg);
                    if(found===-1) return;
                    list.splice(found,1);
                    rdc.set("cmd"+guild.id,JSON.stringify(list),()=>{});
                } catch (error) {
                    channel.send("Syntax ERROR.");
                }
                return;
            case "l": //list
                let list2 ="";
                for(let i=0;i<list.length;i++){
                    list2 = list2 + `${i}:${list[i]}\n`; 
                }
                channel.send("```"+list2+"```");
                return;
            default:
        }
    });
    
}