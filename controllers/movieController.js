'use strict'

const Movie = require('../models/movieModel')

module.exports = {
  getAllMovies: async (req, res) => {
    try {
      const movies = await Movie.find({}).populate('user')
      res.json({ success: true, message: movies })
    } catch (err) {
      console.log('Error: ', err)
      res.status(500).json({ success: false, message: err })
    }
  },
  postMovie: async (req, res) => {
    try {
      req.body.user = req.user.id
      const newMovie = await Movie.create(req.body)
      res.json({ success: true, message: newMovie })
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  },
  // Delete all the movies from Movie collection only if you have an admin role
  deleteAllMovies: async (req, res) => {
    try {
      if (req.user.admin) {
        const deletedMovies = await Movie.remove({})
        res.json({ success: true, message: deletedMovies })
      } else {
        res.status(403).json({ success: false, message: 'You are not allowed to for this operation.' })
      }
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  },
  // Find a specific user based on ID
  findAMovie: async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.movieId)
      res.json({ success: true, message: movie })
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  },
  updateMovie: async (req, res) => {
    try {
      const updatedMovie = await Movie.updateOne({ _id: req.params.movieId }, req.body, { useFindAndModify: false })
      console.log('Updated movie: ', updatedMovie)
      res.json({ success: true, message: updatedMovie })
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  },
  deleteMovie: async (req, res) => {
    try {
      if (req.user.admin) {
        const movie = await Movie.remove({ id: req.params.movieId })
        res.json({ success: true, message: movie })
      } else {
        const movie = await Movie.findById(req.params.movieId)
        console.log('Movie: ', movie)
        if (movie.user.toString() === req.user.id) {
          const movie = await Movie.deleteOne({ _id: req.params.movieId })
          res.json({ success: true, message: movie })
        } else {
          res.status(405).json({ success: false, message: 'You are not allowed to do this operation.' })
        }
      }
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  }
}
