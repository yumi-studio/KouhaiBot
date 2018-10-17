const Discord = require('discord.js')
const rdc = require('redis').createClient(process.env.REDIS_URL)

exports.run = (client,message,cmd) =>{
    if(cmd.lenght<=0) return
    let opt = cmd.split(" ")[0]
    let wcmsg = opt.splice(0,1).join(" ")
    let guild = message.guild
    let channel = message.channel
    let sender = message.author
    let list=[]
    let pos
    if(sender.id!=process.env.BOSS_ID){
        if(!message.member.permissions.hasPermission("ADMINISTRATOR")){
            return
        }
    }
    rdc.get("welcome",(err,reply)=>{
        if(reply!==null){
            list = JSON.parse(reply.toString())
        }
        pos = list.findIndex(m=>m.id==guild.id)
        if(pos==-1) return
        switch(opt[0]){
            case "add": //add new
                if(wcmsg.lenght<=0) return
                list[pos].list.push(wcmsg)
                rdc.set("welcome",JSON.stringify(list),()=>{
                    channel.send("Added new greeting message! Check greeting list with **!wc list**")
                })
                return
            case "delAll": //delete all
                list[pos].list = []
                rdc.set("welcome",JSON.stringify(list),()=>{
                    channel.send("Deleted all greeting message!")
                })
                return
            case "del": //delete single
                try {
                    list[pos].list.splice(wcmsg,1)
                    rdc.set("welcome",JSON.stringify(list),()=>{
                        channel.send("Deleted a greeting message!")
                    })
                } catch (error) {
                    channel.send("Syntax ERROR.")
                }
                return
            case "list": //list
                let list2 =""
                for(let i=0;i<list[pos].list.length;i++){
                    list2 = list2 + `${i}:${list[pos].list[i]}\n` 
                }
                channel.send("```"+list2+"```")
                return
            default:
                return
        }
    })
    
}