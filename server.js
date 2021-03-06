// server.js
//console.log('May Node be with you')

const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const connectionString = "mongodb+srv://tanu:dbtanu03@cluster0.o4rgz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const MongoClient = require('mongodb').MongoClient

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('Project0')
    const quotesCollection = db.collection('quotes')

    // Make sure you place body-parser before your CRUD handlers!
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(bodyParser.json())

    app.listen(3000, function() {
      console.log('listening on 3000')
    })

    app.get('/', function(req, res) {
      //res.sendFile(__dirname + '/index.html')
      db.collection('quotes').find().toArray()
      .then(results => {
        res.render('index.ejs', { quotes: results })
      })
      .catch(error => console.error(error))
    })

    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
          res.redirect("/")
        })
        .catch(error => console.error(error))
    })

    app.put('/quotes', (req, res) => {
      console.log(req.body)
    })
  })