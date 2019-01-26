const app = require('./src/app')
  , mongoose = require('mongoose')
  , config = require('./src/config')



mongoose.connect(config.mongo.uri, config.mongo.options, err => {

  if (err) {
    console.log(err)
    process.exit(1)
  }

  console.log('connected to database...')
  app.listen(config.port, () => {
    console.log('listening on port %d', config.port)
  })
})
