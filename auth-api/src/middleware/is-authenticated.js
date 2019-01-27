const moment = require('moment')
  , { extractJwtToken } = require('../utils')
  , jwt = require('jwt-simple')
  , config = require('../config')
  , authService = require('../services/auth.service')


module.exports = async (req, res, next) => {
  const token = extractJwtToken(req.headers)
  const forbidden = () => res.status(403).end('Forbidden')
  if (token) {
    try {
      const decoded = jwt.decode(token, config.jwt.secret)
      const isValid = [
        decoded => decoded.iss === config.jwt.iss, // check if issuer is our api
        decoded => decoded.exp > moment().unix() // check if token is not expired yet
      ].map(rule => !rule(decoded))
        .filter(Boolean)
        .length === 0

      if (isValid) {
        const user = await authService.byId(decoded.user)
        if (user) {
          req.user = user
          next()
        } else forbidden()

      }
    } catch (e) {
      console.log(e)
      forbidden()
    }

  } else {
    forbidden()
  }
}
