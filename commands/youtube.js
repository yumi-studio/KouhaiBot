const Discord = require('discord.js');
const request = require('request')

exports.run = (client,message,args) =>{
    var src = `https://www.googleapis.com/youtube/v3/search?part=id&maxResults=25&q=${encodeURI(args)}&type=video&key=${process.env.APIKEY}`
}