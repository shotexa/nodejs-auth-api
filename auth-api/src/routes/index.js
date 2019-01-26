const express = require('express')
  , authRouter = require('./auth')

const router = express.Router()

router.use('/auth', authRouter)

router.get('/status', (req, res) => {
  // send logged in status and user role
})

module.exports = router
