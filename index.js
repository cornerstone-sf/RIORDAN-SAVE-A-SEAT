const express = require('express')
const app = express()
const port = 3000

app.engine('html', require('ejs').renderFile)

app.get('/', (req, res) => res.send('Cornerstone Riordian Fundraiser'))

// return of the iframe content yea son
// load file from filesystem
// app.get('/embed')
app.get('/embed', (req, res) => {
    res.render(__dirname + '/index.html', {amount: getDonationSum()})
})
// static serve stuff?? meh meh meh embed it all bro holes, keep it simps though

// redis list aka ledger
// + or - balance adjustments
// yea son, no need to track over time… but we could also do that with meh prop list or whatever bro

app.get('/api/v1/campaign/', (req, res) => {
    // send back dat json broholes
    // TODO: where do we get this from? redis? flatfile? meh meh
    // meh meh meh meh meh meh
    res.send({amount: getDonationSum()})
})

// internal lookup method for the campaign amount bruh

// )
function getDonationSum(){
    // peep redis and get da deets holmes
    return 100000;
}

// admin section
// basic auth from nginx or something son, yea that should do
app.get('/admin', (req, res) => {
    res.render(__dirname + '/admin.html', {amount: getDonationSum()})
})
// should show the current balance, offer the ability to add funds and also set a total
// app.post('/api/v1/donation/')
// update the total amount bruh
// app.patch('/api/v1/campaign/')


app.listen(port, () => console.log(`Example app listening on port ${port}!`))