const joi = require('joi')

module.exports = (schema, req, res, next) => {
  joi.validate(req.body, schema, (err, val) => {
    if (err) {
      res.status(422).json({
        status: 'error',
        message: 'Invalid payload',
        data: {
          payload: val,
          error: (err.details.pop() || {}).context
        }
      }).end()
    } else next()
  })
}
