const Discord = require('discord.js')
const rdc = require('redis').createClient(process.env.REDIS_URL);
var list;

exports.run = (client,message,args) => {
    rdc.get('busy',(err,res)=>{
        if(res===null){
            list = []
        }else{
            list = JSON.parse(res.toString())
        }
    })
    switch(args){
        case 'on':
            if(message.author.presence.status==='dnd'|| message.author.presence.status==='idle'){
                turnon(message.author.id)
            }else{
                message.channel.send('you must be in `Do not disturb` or `Idle`')
            }
            return;
        case 'off':
            turnoff(message.author.id)
            break;
        case 'list':
            message.channel.send(`${JSON.stringify(list)}`)
            break;
        default:
            setContent(message.author.id,args);
            break;
    }

    function turnon(id){
        message.channel.send('tiến hành bật busy mode '+id)
        let fi = list.findIndex(m=> m.id===id)
        message.channel.send(fi)
        if(fi!==-1){
            list[fi].status = 'on'
            if(list[fi].content===''){
                list[fi].content=`<@${list[fi].id}}> is busy.`
            }
            rdc.set("busy",JSON.stringify(list),()=>{
                message.channel.send(`${message.author} busy mode on`)
            })
        }
    }
    
    function turnoff(id){
        let fi = list.findIndex(m=> m.id===id)
        if(fi!==-1){
            list[fi].status = 'off'
            rdc.set("busy",JSON.stringify(list),()=>{})
        }
    }
    
    function setContent(id,ct){
        let fi = list.findIndex(m=> m.id===id)
        message.channel.send(fi);
        if(fi!==-1){
            list[fi].content = ct
            rdc.set("busy",JSON.stringify(list),()=>{
                message.channel.send('busy message is edited.')
            })
        }else{
            let newb = {
                id: id,
                status: 'off',
                content: ct
            }
            message.channel.send(JSON.stringify(newb))
            list.push(newb)
            rdc.set("busy",JSON.stringify(list),()=>{
                message.channel.send('your message is added, use `!busy on` to active')
            })
        }
    }
}

