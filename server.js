// server.js
//console.log('May Node be with you')

const express = require('express')
const bodyParser= require('body-parser')
const app = express()

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, function() {
  console.log('listening on 3000')
})
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})
app.post('/quotes', (req, res) => {
  console.log(req.body)
})