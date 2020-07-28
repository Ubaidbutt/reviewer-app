'use strict'

const Review = require('../models/reviewModel')

module.exports = {
  // Get all the movies from the DB that are not private
  getAllReviews: async (req, res) => {
    try {
      const reviews = await Review.find({ private: false }).populate('user')
      res.json({ success: true, message: reviews })
    } catch (err) {
      console.log('Error: ', err)
      res.status(500).json({ success: false, message: err })
    }
  },
  // Post a review and the review
  postReview: async (req, res) => {
    try {
      req.body.user = req.user.id
      const newReview = await Review.create(req.body)
      res.json({ success: true, message: newReview })
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  },
  // Delete all the movies from Movie collection only if you have an admin role
  deleteAllReviews: async (req, res) => {
    try {
      if (req.user.admin) {
        const deletedReviews = await Review.remove({})
        res.json({ success: true, message: deletedReviews })
      } else {
        res.status(403).json({ success: false, message: 'You are not allowed to for this operation.' })
      }
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  },
  // Find a specific user based on ID
  findAReview: async (req, res) => {
    try {
      const review = await Review.findById(req.params.reviewId)
      res.json({ success: true, message: review })
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  },
  updateReview: async (req, res) => {
    try {
      const updatedReview = await Review.updateOne({ _id: req.params.reviewId }, req.body, { useFindAndModify: false })
      res.json({ success: true, message: updatedReview })
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  },
  deleteReview: async (req, res) => {
    try {
      if (req.user.admin) {
        const review = await Review.remove({ id: req.params.reviewId })
        res.json({ success: true, message: review })
      } else {
        const review = await Review.findById(req.params.reviewId)
        console.log('review: ', review)
        if (review.user.toString() === req.user.id) {
          const review = await Review.deleteOne({ _id: req.params.reviewId })
          res.json({ success: true, message: review })
        } else {
          res.status(405).json({ success: false, message: 'You are not allowed to do this operation.' })
        }
      }
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  }
}
