const express = require('express')
const app = express()
const port = 3000

const redis = require("redis")
const client = redis.createClient()

app.use(express.json())
app.engine('html', require('ejs').renderFile)

app.get('/', (req, res) => res.send('Cornerstone Riordian Fundraiser'))

// return of the iframe content yea son
// load file from filesystem
// app.get('/embed')
app.get('/embed', (req, res) => {
    client.get('ledger', (err, reply) => {
        res.render(__dirname + '/index.html', {amount: reply})
        //return parseInt(reply, 10);
    });
    //res.render(__dirname + '/index.html', {amount: getDonationSum()})
})
// static serve stuff?? meh meh meh embed it all bro holes, keep it simps though

// redis list aka ledger
// + or - balance adjustments
// yea son, no need to track over time… but we could also do that with meh prop list or whatever bro

app.get('/api/v1/campaign', (req, res) => {
    // send back dat json broholes
    // TODO: where do we get this from? redis? flatfile? meh meh
    // meh meh meh meh meh meh
    //const amount = await getDonationSum()
    //res.send({amount: amount})
    client.get('ledger', (err, reply) => {
        res.send({amount: reply})
        //return parseInt(reply, 10);
    });
})

// internal lookup method for the campaign amount bruh

// )
async function getDonationSum(){
    // peep redis and get da deets holmes
    client.get('ledger', (err, reply) => {
        return parseInt(reply, 10);
    });
}

// admin section
// basic auth from nginx or something son, yea that should do
app.get('/admin', (req, res) => {
    client.get('ledger', (err, reply) => {
        res.render(__dirname + '/admin.html', {amount: reply})
        //return parseInt(reply, 10);
    });
    /*
    getDonationSum().then((amount) => {
        res.render(__dirname + '/admin.html', {amount: amount})
    })
    */
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