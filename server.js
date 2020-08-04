// require the basic express modules
const express = require('express')
const bodyParser = require('body-parser')
// const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config() // Read and load the Environment variables from the file

// require mongoose connection object and setup basic emitterss
const mongooseConnection = require('./dbconnections/mongoConnection')
mongooseConnection.on('connected', () => console.log('MongoDB connected at PORT 27017'))
mongooseConnection.on('error', (err) => console.log('MongoDB connection error: ', err))

// Router files
const userRouter = require('./routers/userRouter')
const reviewRouter = require('./routers/reviewRouter')

const app = express()

// Parse application/json and console the logging
app.use(bodyParser.json())
// app.use(morgan('dev'))

app.use('/users', userRouter)
app.use('/reviews', reviewRouter)

app.listen(process.env.PORT, () => {
  console.log(`The server is up and running at PORT ${process.env.PORT}`)
})
