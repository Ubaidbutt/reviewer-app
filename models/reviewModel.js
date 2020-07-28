'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  entity: {
    type: String,
    enum: ['movie', 'book'],
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  roles: [
    {
      type: String,
      required: true
    }
  ],
  comments: {
    type: String,
    required: true
  },
  director: {
    type: String
  },
  writer: {
    type: String
  },
  private: {
    type: Boolean,
    default: false
  },
  genre: [
    {
      type: String
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
}, {
  timestamps: true
})

const Review = mongoose.model('review', reviewSchema)

module.exports = Review
