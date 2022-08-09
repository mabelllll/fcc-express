require('dotenv').config()
let express = require('express');
let app = express();
let absolutePath = '/views/index.html'
let absolutePath1 = '/public'
var message = "Hello json"

// console.log("Hello World");

// app.get("/", function (req, res) {
//     res.send("Hello Express")
// })

app.use((req, res, next) => {
    let logger = req.method + " " + req.path + " - " + req.ip
    console.log(logger)
    console.log(req.ip)
    next()
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + absolutePath)
} )

app.use('/public', express.static(__dirname + absolutePath1))

app.get("/json", (req, res) => {
    if(process.env.MESSAGE_STYLE === "uppercase") {
        res.json({
            "message": message.toUpperCase()
        })
    } else {
        res.json({
            "message": message
        })
    }
})

app.get('/now', (req, res, next) => {
    req.time = new Date().toString()
    next()
}, (req, res) => {
    res.json({time : req.time})
})






























 module.exports = app;
