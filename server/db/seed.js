const db = require('./index')
const cohortsSeed = require('./seed/cohorts.json')
const pairsSeed = require('./seed/pairs.json')

db.sequelize.sync({ force: true })
  .then(() => db.Cohort.bulkCreate(cohortsSeed))
  .then(() => db.Pair.bulkCreate(pairsSeed))
  .catch(err => console.log(err))