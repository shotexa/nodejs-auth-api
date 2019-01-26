const express = require('express')
  , bodyParser = require('body-parser')
  , router = require('./routes')


const app = express()
// Attach middleware
app.use(bodyParser.json())

// Init routes
app.use('/api/', router)

// 404 Router
app.use('*', function (req, res) {
  res.sendStatus(404)
})

module.exports = app
