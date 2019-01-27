const mongoose = require('mongoose')

after(done => {
  mongoose.connection.db.dropDatabase()
  done()
})
