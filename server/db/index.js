const Sequelize = require('sequelize')

const sequelize = new Sequelize('database_development', 'student', 'student', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => { console.log('Connection has been established successfully.') })
  .catch(err => { console.error('Unable to connect to the database:', err) })

const Cohort = sequelize.define('cohort', {
  name: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  image: { type: Sequelize.STRING }
}, { underscored: true})

const Pair = sequelize.define('pair', {
  engineer1: { type: Sequelize.STRING },
  engineer2: { type: Sequelize.STRING },
  event: { type: Sequelize.STRING },
  misc: { type: Sequelize.STRING }
}, { underscored: true})

sequelize.sync({force: false})

module.exports = { sequelize, Cohort, Pair }