'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  director: {
    type: String
  },
  lead: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  private: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
}, {
  timestamps: true
})

const Movies = mongoose.model('movie', movieSchema)

module.exports = Movies
