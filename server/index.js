const express = require('express')
const path = require('path')
const parser = require('body-parser')
const db = require('../database')

const app = express()

app.use(parser.json())
app.use(parser.urlencoded({extended: true}))


app.use('/assets', express.static(path.join(__dirname, '../node_modules/angular')))
app.use(express.static(path.join(__dirname, '../client')))

app.get('/cohort', (req, res) => {
  db.Student.find({}, (err, data) => {
    if (err) {
      return console.log(err)
    }
    res.status(200).send(data)
  })
})

app.post('/cohort', (req, res) => {
  // not used
  res.status(200).send('cohort is fixed, no problem')  
})

app.get('/event', (req, res) => {
  db.Event.find({}, (err, data) => {
    if (err) {
      return console.log(err)
    }
    res.status(200).send(data)
  })
})

app.post('/event', (req, res) => {
  // not used
  res.status(200).send('server responding')  
})

app.get('/pair', (req, res) => {
  db.Pair.find({}, (err, data) => {
    if (err) {
      return console.log(err)
    }
    res.status(200).send(data)
  })
})

app.post('/pair', (req, res) => {
  const newPair = new db.Pair(req.body)
  newPair.save((err, data) => {
    if (err) {
      res.send('error posting pair')
      return console.log(err)
    }
    res.status(201).send(data)  
  })
})

// wildcard route sends 404
app.use('/*', (req, res) => {
  res.status(404).send(`${req.method} handler for ${req.url} not found`)
})


app.listen(3000, () => {
  console.log('Server listening on 3000')
})
