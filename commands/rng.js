const discord = require('discord.js')

exports.run=(client,message,args)=>{
    var x = args.split(' ')
    var arr
    var res =''
    switch(x[0]){
        case 's':
            try {
                arr = x[1].split('-')
                message.channel.send(`Result: ${process(arr[0],arr[1])}`)
            } catch (error) {
                console.log()
            }
            return
        case 'm':
            try {
                arr = x[2].split('-')
                while(x[1]!=0){
                    res+=process(arr[1],arr[2])
                    x[1]--
                }
            } catch (error) {
                console.log("rng error:\n"+error)
            }
            return
        default:
    }

    function process(x,y){
        return Math.floor(Math.random()*(y+1-x))+x;
    }
}