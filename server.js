var express = require('express')
var app = express()

var port = process.env.PORT || 8080

app.use(express.static(__dirname))

app.get("/",(req,res)=>{
    res.render("index")
})

app.listen(port,()=>{
    console.log("server is running")
})