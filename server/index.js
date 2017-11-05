const express = require('express')
const path = require('path')
const parser = require('body-parser')
const db = require('./db/index')

const app = express()
const PORT = 3000

app.use(parser.json())

console.log('path.join ', path.join(__dirname, '../client/public'))
app.use(express.static(path.join(__dirname, '../client/public')))

app.get('/cohort', (req, res) => {
  db.Cohort.findAll().then(cohort => {  
    res.status(200).send(cohort)
  })
})

app.get('/pairs', (req, res) => {
  db.Pair.findAll().then(pair => {  
    res.status(200).send(pair)
  })
})

app.post('/newPair', (req, res) => {
  console.log('req.body is ', req.body)
  db.Pair.create(req.body).then(pair => {  
    res.status(200).send('pair created!!!')
  })
})

app.listen(PORT, ()=> {
  console.log('SERVER listening on PORT', PORT)
})