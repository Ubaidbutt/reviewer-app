'use strict'

const redis = require('redis')

module.exports = redis.createClient() // Default port: 6379
