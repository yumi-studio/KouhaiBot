exports.run = (client,message,cmd) =>{
    if(message.author.id!== process.env.BOSS_ID) return
    try {
        let ev = eval(cmd)
        if(typeof ev !== 'string'){
            ev = require('util').inspect(ev)
        }
        let inp = '```'+cmd+'```'
        let outp =  '```'+ev+'```'
        message.channel.send(`input\n${inp}\noutput\n${outp}`)
    } catch (error) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
}