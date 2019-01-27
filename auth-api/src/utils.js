const crypto = require('crypto')
  , bcrypt = require('bcrypt-nodejs')
  , config = require('./config')


const generateRandomToken = length => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(Number(length), (err, buffer) => {
      if (err) reject(err)
      else resolve(buffer.toString('hex'))
    })
  })
}

const compareHashed = (str, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(str, hash, (err, success) => {
      if (err) reject(err)
      else resolve(success)
    })
  })
}
const extractJwtToken = headers => {
  return headers && headers[config.jwt.name] ? headers[config.jwt.name].split(' ')[1] : null
}

module.exports = {
  generateRandomToken,
  compareHashed,
  extractJwtToken
}
