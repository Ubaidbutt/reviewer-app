const mongoose = require('mongoose')

const dbConfig = require('../configurations/dbConfig')

// Mongoose connection
const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}

mongoose.connect(`${dbConfig.dbUrl}/${dbConfig.dbName}`, mongooseOptions)

module.exports = mongoose.connection
