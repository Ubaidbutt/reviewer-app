const brcypt = require('bcryptjs')

const User = require('../models/userModel')
const userAuth = require('../authentication/userAuth')

const client = require('../dbconnections/redisConnection')

module.exports = {
  // Register a user in the application
  signup: async (req, res) => {
    try {
      req.body.password = brcypt.hashSync(req.body.password, 10)
      req.body.admin = false
      const newUser = await User.create(req.body)
      res.json({ success: true, message: { username: newUser.username, email: newUser.email } })
    } catch (err) {
      console.log(err)
      res.status(500).json({ success: false, message: err })
    }
  },
  // Login the user and assign a Bearer token to the user
  login: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username }, '+password')
      if (!user) {
        res.status(404).json({ success: false, message: 'User not found.' })
      } else {
        const passwordMatch = brcypt.compareSync(req.body.password, user.password)
        if (passwordMatch) {
          const token = await userAuth.getToken({ username: user.username, id: user._id })
          client.set(user.username, token.refreshToken, (err) => {
            if (err) {
              console.log('Error redis: ', err)
              return res.status(500).json({ success: false, message: err })
            }
            res.json({ suucess: true, message: token })
          })
        } else {
          res.status(401).json({ success: false, message: 'Incorrect username or password' })
        }
      }
    } catch (err) {
      console.log('Error: ', err)
      res.status(500).json({ success: false, message: err })
    }
  },
  // Renew your token after your JWT token expires
  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken
    userAuth.verifyRefreshToken(refreshToken)
      .then((user) => {
        client.get(user.username, async (err, value) => {
          if (err) {
            return res.status(500).json({ success: false, message: err })
          } else if (value === refreshToken) {
            const token = await userAuth.getToken({ username: user.username, id: user.id })
            client.set(user.username, token.refreshToken, (err) => {
              if (err) {
                return res.status(500).json({ success: false, message: err })
              }
              res.json({ suucess: true, message: token })
            })
          } else {
            return res.status(500).json({ success: false, message: 'Token mismatch' })
          }
        })
      })
  },
  // Get all the users from the User collection in the MongoDB
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({}).lean()
      res.json(users)
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  },
  // Delete all the user from User collection only if you have an admin role
  deleteAllUsers: async (req, res) => {
    try {
      if (req.user.admin) {
        const deletedUsers = await User.remove({})
        res.json({ success: true, message: deletedUsers })
      } else {
        res.status(403).json({ success: false, message: 'You are not allowed to for this operation.' })
      }
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  },
  // Find a specific user based on ID
  findAUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId)
      res.json({ success: true, message: user })
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  },
  updateUser: async (req, res) => {
    try {
      if (req.body.admin) {
        req.body.admin = false
      }
      const updatedUser = await User.updateOne({ _id: req.params.userId }, req.body, { useFindAndModify: false })
      res.json({ success: true, message: updatedUser })
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  },
  deleteUser: async (req, res) => {
    try {
      if (req.user.admin) {
        const user = await User.remove({ id: req.params.userId })
        res.json({ success: true, message: user })
      } else {
        if (req.user.id === req.params.userId) {
          const user = await User.deleteOne({ id: req.params.userId })
          res.json({ success: true, message: user })
        } else {
          res.status(405).json({ success: false, message: 'You are not allowed to do this operation.' })
        }
      }
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  }
}
