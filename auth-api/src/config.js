module.exports = {
  port: 8080,
  mongo: {
    uri: process.env.MONGO_URI,
    options: {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      dbName: 'upstack'
    }
  },
  email: {
    service: 'gmail',
    user: 'gavrilo.princip1919@gmail.com',
    password: 'gavrilo123456'
  },
  jwt: {
    secret: 'ypfTXc2zVh',
    iss: 'auth-api',
    name: 'x-access-token'
  }
}
