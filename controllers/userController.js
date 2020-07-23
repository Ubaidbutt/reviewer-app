'use strict'

const brcypt = require('bcryptjs')

const User = require('../models/userModel')
const userAuth = require('../authentication/userAuth')

module.exports = {
  signup: async (req, res) => {
    try {
      req.body.password = brcypt.hashSync(req.body.password, 10)
      const newUser = await User.create(req.body)
      res.json({ success: true, message: newUser })
    } catch (err) {
      console.log(err)
      res.statusCode(500).json({ success: false, message: err })
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username })
      if (!user) {
        res.status(404).json({ success: false, message: 'User not found.' })
      } else {
        const passwordMatch = brcypt.compareSync(req.body.password, user.password)
        if (passwordMatch) {
          const token = await userAuth.getToken({ username: user.username, id: user._id })
          res.json({ suucess: true, message: token })
        } else {
          res.status(401).json({ success: false, message: 'Incorrect username or password' })
        }
      }
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  },
  getAllUsers: async (req, res) => {
    console.log('Request received: ', req.user)
    try {
      const user = await User.findById(req.user.user.id)
      res.json(user)
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  }
}
