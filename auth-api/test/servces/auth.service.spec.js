const assert = require('assert')
  , authService = require('../../src/services/auth.service')
  , User = require('../../src/models/user')
  , AuthToken = require('../../src/models/activation-token')


describe('Testing Authentication Service', () => {
  it('Should register a new user', done => {
    authService.register({
      role: 'user',
      email: 'email@emailexample425323.com',
      username: 'username',
      password: 'p4$$w0rd'
    }).then(res => {
      return User.findOne({ email: 'email@emailexample425323.com' })
    }).then(user => {
      assert.equal(user.email, 'email@emailexample425323.com')
      done()
    }).catch(err => done(err))
  })

  it('should create activation token for the user', done => {
    User.findOne({ email: 'email@emailexample425323.com' })
      .then(user => {
        assert.notEqual(user, null)
        return authService.registerActivationToken(user).then(token => user._id)
      }).then(user => {
        return AuthToken.findOne({ user })
      }).then(token => {
        assert.notEqual(token, null)
        done()
      })
      .catch(err => done(err))
  })

  it('Should not register user with same email', done => {
    authService.register({
      role: 'user',
      email: 'email@emailexample425323.com',
      username: 'username',
      password: 'p4$$w0rd'
    }).then(res => {
      return User.find({ email: 'email@emailexample425323.com' })
    }).then(users => {
      assert.equal(users.length, 1)
      done()
    }).catch(err => done(err))
  })

  it('Should not find the user if it is not activated', done => {
    authService.byEmail('email@emailexample425323.com')
      .then(res => {
        assert.equal(res, null)
        done()
      }).catch(err => done(err))
  })

  it('should activate user', done => {
    User.findOne({ email: 'email@emailexample425323.com' })
      .then(user => {
        assert.notEqual(user, null)
        return user._id
      }).then(user => {
        return AuthToken.findOne({ user })
      }).then(token => {
        assert.notEqual(token, null)
        return authService.activate(token.token)
      }).then(res => {
        assert.notEqual(res.user, null)
        assert.equal(res.user.active, true)
        done()
      })
      .catch(err => done(err))
  })



})
