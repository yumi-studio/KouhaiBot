exports.run = (Discord,rdc,client,message,args) =>{
    const https = require("https");
    var src = `https://www.googleapis.com/youtube/v3/search?part=id&maxResults=25&q=${encodeURI(args)}&type=video&key=${process.env.APIKEY}`
    https.get(src,function(data){
        // var rd = Math.floor(Math.random()*data.items.length);
        // var em = new Discord.RichEmbed();
        // em.setURL("https://youtube.conm/watch?v="+data.items[0].id.videoId);
        console.log(data);
        // message.channel.send(em);
    });
}