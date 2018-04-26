exports.run = (Discord,rdc,client,message,cmd) =>{
    if(cmd.lenght<=0) return;
    let opt = cmd.split(" ")[0];
    let wcmsg = cmd.substring(2);
    let guild = message.guild;
    let channel = message.channel;
    let sender = message.author;
    let list=[];
    if(sender.id!==process.env.BOSS_ID && message.member.permissions.FLAGS!=="ADMINISTRATOR") return;
    rdc.get("welcome"+guild.id,(err,reply)=>{
        if(reply!==null){
            list = JSON.parse(reply.toString());
        }
    });
    switch(opt){
        case "a":
            if(wcmsg.lenght<=0) return;
            list.push(wcmsg);
            rdc.set("welcome"+guild.id,JSON.stringify(list),()=>{
                channel.send("Added new greeting message! Check greeting list with **!wc l**");
            });
            return;
        case "d":
            
            return;
        case "l":
            let list2 ="`";
            let i=0;
            list.forEach(m=>{
                list2+= i +":"+ m[i]+ "/n";
                i++;
            })
            channel.send(list2);
            return;
        default:
    }
}