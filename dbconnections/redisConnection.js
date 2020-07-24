'use strict'

const redis = require('redis')

// Connect at default port: 6379
const client = redis.createClient() // create the redis client

client.on('error', (err) => console.log('Redis connection error: ', err))
module.exports = client
