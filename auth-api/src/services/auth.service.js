const User = require('../models/user')
  , { generateRandomToken } = require('../utils')
  , ActivationToken = require('../models/activation-token')
  , jwt = require('jwt-simple')
  , config = require('../config')
  , moment = require('moment')


const register = async payload => {
  const user = await User.findOne({ email: payload.email })
  if (!user) {

    const newUser = await User.create(payload)
    return {
      error: false,
      newUser
    }
  } else {
    return {
      error: true,
      message: 'Email already exists'
    }
  }
}

const getAuthToken = async user => {
  return 'JWT ' + jwt.encode({
    user: user._id,
    iss: config.jwt.iss,
    iat: moment().unix(), // Issue timestamp
    exp: moment().add(1, 'days').unix() // Token is valid for the next day
  }, config.jwt.secret)
}

const activate = async token => {
  const tokenDoc = await ActivationToken.findOne({ token })
  const userDoc = await User.findOneAndUpdate(
    { _id: (tokenDoc || {}).user, active: false }
    , { $set: { active: true } }
    , { new: true }
  )

  if (!userDoc) {
    return {
      error: true,
      message: 'Invalid Activation Token'
    }
  } else {
    await ActivationToken.deleteOne({ _id: tokenDoc._id })
    return {
      error: false,
      user: userDoc
    }
  }
}

const registerActivationToken = async user => {
  const token = await generateRandomToken(48)
  await ActivationToken.create({ user, token })
  return token
}

const byEmail = email => {
  return User.findOne({ email, active: true })
}

const byId = id => {
  return User.findById(id)
}

module.exports = {
  register,
  getAuthToken,
  activate,
  registerActivationToken,
  byEmail,
  byId
}
