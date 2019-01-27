const express = require('express')
  , controller = require('./controller')
  , validatePayload = require('../../middleware/validate-payload')
  , validateUrlParams = require('../../middleware/validate-url-params')
  , registrationSchema = require('./validators/register')
  , loginSchema = require('./validators/login')
  , activationSchema = require('./validators/activate')
require('express-async-errors')


const router = express.Router()

router.post('/register', validatePayload.bind(null, registrationSchema), controller.register)
router.post('/login', validatePayload.bind(null, loginSchema), controller.login)
router.get('/activate/:token', validateUrlParams.bind(null, activationSchema), controller.activate)


module.exports = router
