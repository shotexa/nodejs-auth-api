const mongoose = require('mongoose')

const activationTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  }
})


module.exports = mongoose.model('ActivationToken', activationTokenSchema, 'activationTokens')
