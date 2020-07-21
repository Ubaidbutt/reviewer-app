'use strict'

const express = require('express')
const app = express()

app.all('/', (req, res) => {
  res.json({ message: 'It is working' })
})

app.listen(9000, () => {
  console.log('The server is up and running. ')
})
