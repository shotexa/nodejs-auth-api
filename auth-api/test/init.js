
const mongoose = require('mongoose')
  , config = require('../src/config')


before(done => {
  // Connect to MongoDB
  mongoose.connect(config.mongo.uri, {
    dbName: 'upstack-test',
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  mongoose.connection
    .once('open', (console.log('connected'), done()))
    .on('error', err => (console.log(err), done()))
})

