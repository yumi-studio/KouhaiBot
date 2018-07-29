const rq = require('request')
var parser = require('string-to-dom')
exports.run= (client,message,args)=>{
    rq.get('http://kawaiiface.net/happy-kawaii-faces/',(err,res,body)=>{
        let x = parser(body)
        let xx = x.getElementByClassName('btn btn-default')
        let ran = Math.floor(Math.random()*xx.lenght);
        let emo = xx[ran].getAttribute('data-clipboard-text')
        message.channel.send(emo)
    })
}