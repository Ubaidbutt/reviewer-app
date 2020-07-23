'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const dbConfig = require('./configurations/dbConfig')

const app = express()

const userRouter = require('./routers/userRouter')

// Mongoose connection
const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}
mongoose.connect(`${dbConfig.dbUrl}/${dbConfig.dbName}`, mongooseOptions)

// Parse application/json
app.use(bodyParser.json())

app.use('/users', userRouter)

app.listen(9000, () => {
  console.log('The server is up and running. ')
})
