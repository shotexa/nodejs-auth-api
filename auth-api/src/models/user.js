const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  active: {
    type: Boolean,
    required: true,
    default: false
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid Email'] // https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax#answer-18022766
  },
  role: {
    type: String,
    trim: true,
    required: true,
    default: 'user'
  }
})


module.exports = mongoose.model('User', userSchema, 'users')
