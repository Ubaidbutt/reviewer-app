'use strict'

// require the basic express modules
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

// require mongoose connection object and setup basic emitterss
const mongooseConnection = require('./dbconnections/mongoConnection')
mongooseConnection.on('connected', () => console.log('MongoDB connected. '))
mongooseConnection.on('error', (err) => console.log('MongoDB connection error: ', err))

// Configuration files
const serverConfig = require('./configurations/serverConfig')

// Router files
const userRouter = require('./routers/userRouter')
const movieRouter = require('./routers/movieRouter')

const app = express()

// Parse application/json and console the logging
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/users', userRouter)
app.use('/movies', movieRouter)

app.listen(serverConfig.serverPort, () => {
  console.log(`The server is up and running at PORT ${serverConfig.serverPort}`)
})
