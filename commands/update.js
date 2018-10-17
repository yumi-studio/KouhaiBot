exports.run=(client,message,cmd)=>{
    client.guilds.array().forEach(guild => {
        let channel = guild.channels.array().find(c=>{
            return c.type=="text"&&c.permissonsFor(guild.me).has("SEND_MESSAGES")
        })
        try {
            channel.send(cmd)
        } catch (error) {
            console.log(error)
        }
    });
}