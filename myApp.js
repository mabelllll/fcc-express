require('dotenv').config()
let express = require('express')
let app = express();
let bodyParser = require('body-parser')
let absolutePath = '/views/index.html'
let absolutePath1 = '/public'
var messageString = "Hello json"

// console.log("Hello World");

// app.get("/", function (req, res) {
//     res.send("Hello Express")
// })

app.use(bodyParser.urlencoded({extended: false}))

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
            messageString: message.toUpperCase()
        })
    } else {
        res.json({
            messageString: message
        })
    }
})

app.get('/now', (req, res, next) => {
    req.time = new Date().toString()
    next()
}, (req, res) => {
    res.json({time : req.time})
})

app.get('/:word/echo', (req, res) => {
    res.json({"echo": req.params.word})
})

/*

ALTERNATIVE OPTION BELOW

app.get('/name', (req, res) => {
    const firstname = req.query.first
    const lastname = req.query.last
    res.json({
        name: firstname + " " + lastname
    })
})

*/

app.route('/name').get((req,res) => {
    const firstname = req.query.first
    const lastname = req.query.last
    res.json({
        name: firstname + " " + lastname
    })
})

app.post('/name', (req, res) => {
    const firstname = req.body.first
    const lastname = req.body.last
    res.json({
        name: firstname + " " + lastname
    })
})





























 module.exports = app;
