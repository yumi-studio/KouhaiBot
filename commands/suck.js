exports.run = (Discord,rdc,client,message,args) =>{
    let text = `suck ${args}`;
    try {
		let png = drawing(require('pngjs').PNG);
		http.get("http://i.imgur.com/ZZn9DUa.png", m => {
			m.pipe(new png({ filterType: 4 }))
			.on('parsed', function() {
				this.drawPixel(150,200, this.colors.black());
				this.drawText(20,20,text, this.colors.new(0,0,0));
				this.pack().pipe(fs.createWriteStream('test.png'));
				let file = new Discord.Attachment("test.png","test.png");
				em.attachFile(file);
				message.channel.send(em);
			});
		});
	} catch (error) {
		console.log(error);
	}
}