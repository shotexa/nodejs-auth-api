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

// Global error handler
app.use((err, req, res, next) => {
  console.error('UNHANDLED ERROR:', err)

  res
    .status(err.status || 400)
    .end('Bad Request')
})


module.exports = app
