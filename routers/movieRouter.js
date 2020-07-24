'use strict'

const express = require('express')

const movieController = require('../controllers/movieController') // Load the user controller
const userAuth = require('../authentication/userAuth') // Load user authentication middleware

const movieRouter = express.Router()

// Route all the request coming at /users to this route
movieRouter.route('/')
  .get(userAuth.verifyToken, movieController.getAllMovies)
  .post(userAuth.verifyToken, movieController.postMovie)
  .put((req, res) => res.status(405).json({ success: false, message: 'PUT operation is not allowed' }))
  .delete(userAuth.verifyToken, movieController.deleteAllMovies)

module.exports = movieRouter
