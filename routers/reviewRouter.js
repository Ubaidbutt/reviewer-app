const express = require('express')

const reviewController = require('../controllers/reviewController') // Load the review controller
const userAuth = require('../authentication/userAuth') // Load user authentication middleware

const reviewRouter = express.Router()

// Route all the request coming at /users to this route
reviewRouter.route('/')
  .get(userAuth.verifyToken, reviewController.getAllReviews)
  .post(userAuth.verifyToken, reviewController.postReview)
  .put((req, res) => res.status(405).json({ success: false, message: 'PUT operation is not allowed' }))
  .delete(userAuth.verifyToken, reviewController.deleteAllReviews)

reviewRouter.route('/:reviewId')
  .get(userAuth.verifyToken, reviewController.findAReview)
  .post((req, res) => res.status(405).json({ success: false, message: 'POST operation is not allowed' }))
  .put(userAuth.verifyToken, reviewController.updateReview)
  .delete(userAuth.verifyToken, reviewController.deleteReview)

reviewRouter.route('/')

module.exports = reviewRouter
