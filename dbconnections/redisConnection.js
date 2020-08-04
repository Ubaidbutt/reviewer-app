const redis = require('redis')

// Connect at default port: 6379
const client = redis.createClient({ host: 'redis' }) // create the redis client

client.on('error', (err) => console.log('Redis connection error: ', err))
client.on('ready', () => console.log('Redis server connected at PORT 6379'))
module.exports = client
