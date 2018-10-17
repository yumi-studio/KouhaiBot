const rdc = require('redis').createClient(process.env.REDIS_URL);

exports.run = (client,message,cmd)=>{
    if(message.author.id==process.env.BOSS_ID){
        let guildList = client.guilds.array()
        let wcList = []
        let customList = []
        guildList.forEach(m => {
            wcList.push({
                id : m.id,
                list: []
            })
            customList.push({
                id : m.id,
                list: []
            })
        });
        rdc.set("welcome",JSON.stringify(wcList),()=>{})
        rdc.set("custom",JSON.stringify(customList),()=>{})
    }
}