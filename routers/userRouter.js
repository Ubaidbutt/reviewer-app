'use strict'

const express = require('express')

const userController = require('../controllers/userController')

const userAuth = require('../authentication/userAuth')

const userRouter = express.Router()

userRouter.route('/')
  .get(userAuth.verifyToken, userController.getAllUsers)
  .post()
  .put()
  .delete()

userRouter.route('/signup')
  .post(userController.signup)
userRouter.route('/login')
  .post(userController.login)
module.exports = userRouter
