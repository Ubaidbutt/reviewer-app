const express = require('express')

const userController = require('../controllers/userController') // Load the user controller
const userAuth = require('../authentication/userAuth') // Load user authentication middleware

const userRouter = express.Router()

// Route all the request coming at /users to this route
userRouter.route('/')
  .get(userAuth.verifyToken, userController.getAllUsers)
  .post((req, res) => res.status(405).json({ success: false, message: 'Use signup for creating a user' }))
  .put((req, res) => res.status(405).json({ success: false, message: 'PUT operation is not allowed' }))
  .delete(userAuth.verifyToken, userController.deleteAllUsers)

userRouter.route('/:userId/user')
  .get(userAuth.verifyToken, userController.findAUser)
  .post((req, res) => res.status(405).json({ success: false, message: 'POST operation is not allowed' }))
  .put(userAuth.verifyToken, userController.updateUser)
  .delete(userAuth.verifyToken, userController.deleteUser)

// users/signup
userRouter.route('/signup')
  .post(userController.signup)
// users/login
userRouter.route('/login')
  .post(userController.login)
// users/refreshToken
userRouter.route('/refreshToken')
  .post(userController.refreshToken)

module.exports = userRouter
