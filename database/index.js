const mongoose = require('mongoose')
const dbCon = mongoose.connect('mongodb://localhost/HRLA18FSreview', { useMongoClient: true })

dbCon.on('error', console.error.bind(console, 'connection error:'))
dbCon.once('open', function() {
  console.log('connected to database')
})

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String
})

const eventSchema = new mongoose.Schema({
  type: String,
  title: String,
  description: String,
  activity_date: String
})

const pairSchema = new mongoose.Schema({
  event: String,
  engineer1: String,
  engineer2: String,
  misc: String
})

const Student = mongoose.model('Student', studentSchema)
const Event = mongoose.model('Event', eventSchema)
const Pair = mongoose.model('Pair', pairSchema)


module.exports = {dbCon, Student, Event, Pair}
