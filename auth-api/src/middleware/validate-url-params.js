const joi = require('joi')

module.exports = (schema, req, res, next) => {
  joi.validate(req.params, schema, (err, val) => {
    if (err) {
      res.status(422).json({
        status: 'error',
        message: 'Invalid parameters',
        data: {
          payload: val,
          error: (err.details.pop() || {}).context
        }
      }).end()
    } else next()
  })

}
