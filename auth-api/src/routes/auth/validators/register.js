const joi = require('joi')


module.exports = {
  username: joi.string().required(),
  password: joi.string().min(6, 'utf8').required(),
  email: joi.string().email().required(),
  role: joi.string().regex(/^(admin|user)+$/i).required()
}

