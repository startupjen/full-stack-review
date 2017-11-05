const cohort = require('./cohorts.json')
// const events = require('./events_json.json') // unused
const pairs = require('./pairs.json')

const mongoose = require('mongoose')
const dbCon = mongoose.connect('mongodb://localhost/HRLA18FSreview', { useMongoClient: true })
mongoose.Promise = global.Promise;

dbCon.on('error', console.error.bind(console, 'connection error:'))
dbCon.once('open', function() {

  console.log('connected to database')

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

  // counter for checking if all are seeded
  let modelsSeeded = 0

  Student.remove({} ,(err) => {
    if (err) {
      return console.log(err)
    }

    Student.insertMany(cohort, () => {
      modelsSeeded++

      if (modelsSeeded === 2){
        console.log('seeding complete.. disconnecting.')
        mongoose.disconnect()
      }

    })

  })

  Pair.remove({} ,(err) => {
    if (err) {
      return console.log(err)
    }

    Pair.insertMany(pairs, () => {
      modelsSeeded++

      if (modelsSeeded === 2){
        console.log('seeding complete.. disconnecting.')
        mongoose.disconnect()
      }

    })

  })
  

})

