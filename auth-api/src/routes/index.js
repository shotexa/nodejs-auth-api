const express = require('express')
  , authRouter = require('./auth')
  , isAuthenticated = require('../middleware/is-authenticated')


const router = express.Router()
router.use('/auth', authRouter)

router.get('/status', isAuthenticated, (req, res) => {
  // send logged in status and user role
  res.end(`logged in as ${req.user.username}, role: ${req.user.role}`)
})



module.exports = router
