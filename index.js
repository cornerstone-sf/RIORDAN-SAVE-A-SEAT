const express = require('express')
const app = express()
const port = 3000

const redis = require("redis")
const client = redis.createClient()

const {promisify} = require('util')
const getAsync = promisify(client.get).bind(client)

app.use(express.json())
app.engine('html', require('ejs').renderFile)

app.get('/', (req, res) => res.send('Cornerstone Riordian Fundraiser'))

// return of the iframe content yea son
// load file from filesystem
// app.get('/embed')
app.get('/embed', (req, res) => {
    getDonationSum().then((amount) => {
        res.render(__dirname + '/index.html', {amount: amount})
    })
})

app.get('/debug', (req, res) => {
    getDonationSum().then((amount) => {
        res.render(__dirname + '/debug.html', {amount: amount})
    })
})
// static serve stuff?? meh meh meh embed it all bro holes, keep it simps though

// redis list aka ledger
// + or - balance adjustments
// yea son, no need to track over time… but we could also do that with meh prop list or whatever bro

app.get('/api/v1/campaign', (req, res) => {
    // send back dat json broholes
    // TODO: where do we get this from? redis? flatfile? meh meh
    // meh meh meh meh meh meh
    // client.get('ledger', (err, reply) => {
    //     res.send({amount: reply})
    // });
    getDonationSum().then((amount) => {
        res.send({amount: amount})
    })
})

// internal lookup method for the campaign amount bruh

// )
async function getDonationSum(){
    const res = await getAsync('ledger')
    return parseInt(res, 10)
}

// admin section
// basic auth from nginx or something son, yea that should do
app.get('/admin', (req, res) => {
    // client.get('ledger', (err, reply) => {
    //     res.render(__dirname + '/admin.html', {amount: reply})
    // });
    getDonationSum().then((amount) => {
        res.render(__dirname + '/admin.html', {amount: amount})
    })
})
// should show the current balance, offer the ability to add funds and also set a total
app.post('/api/v1/donation', (req, res) => {
    // server validat bro
    const amount = parseInt(req.body.amount)
    console.log(amount)
    //client.zadd('ledger', amount, Date.now())
    client.incrby('ledger', amount)
    res.send({success: true})
})
// update the total amount bruh
app.patch('/api/v1/campaign', (req, res) => {
    const amount = parseInt(req.body.amount)
    console.log(amount)
    client.set('ledger', amount)
    res.send({success: true})
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))