'use strict'

const jwt = require('jsonwebtoken')

const userConfig = require('../configurations/userConfig')

module.exports = {
  getToken: async (userInfo) => {
    console.log('User info: ', userInfo)
    return new Promise(async (resolve, reject) => {
      try {
        const token = await jwt.sign({ user: userInfo }, userConfig.secretKeyForJwtToken, {
          expiresIn: 3600 // expires in 1 hour
        })
        const refreshToken = await jwt.sign({ user: userInfo }, userConfig.secretKeyForJwtToken, {
          expiresIn: 7200 // expires in 24 hours
        })
        resolve({
          username: userInfo.username,
          token: `Bearer ${token}`,
          refreshToken: refreshToken,
          tokenExpiresIn: 3600,
          refreshTokenExpiresIn: 7200
        })
      } catch (err) {
        reject(err)
      }
    })
  },
  verifyToken: (req, res, next) => {
    const userToken = req.headers.authorization.split(' ')[1]
    jwt.verify(userToken, userConfig.secretKeyForJwtToken, (err, user) => {
      if (err) {
        res.status(401).json({ success: false, message: err })
      } else {
        req.user = user
        next()
      }
    })
  }
}
