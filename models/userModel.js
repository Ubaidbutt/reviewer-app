const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  email: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: true
  },
  country: {
    type: String
  }
}, {
  timestamps: true
})

const Users = mongoose.model('user', userSchema)

module.exports = Users
