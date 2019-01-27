const joi = require('joi')

module.exports = {
  password: joi.string().required(),
  email: joi.string().email().required()
}
