const authService = require('../../services/auth.service')
  , mailService = require('../../services/mail.service')
  , { compareHashed } = require('../../utils')


const register = async (req, res) => {
  const payload = req.body
  const regResult = await authService.register(payload)

  if (regResult.error) {
    res.json({
      status: 'error',
      message: regResult.message,
      data: {}
    }).end()

  } else {
    const token = await authService.registerActivationToken(regResult.newUser)
    const url = `${req.protocol}://${req.headers.host}/api/auth/activate/${token}`
    await mailService.sendActivationUrl(regResult.newUser, url)
    res.json({
      status: 'success',
      data: regResult.newUser
    }).end()
  }
}

const login = async (req, res) => {
  const payload = req.body
  const invalidCredentials = () => {
    res.status(404)
      .json({
        status: 'error',
        message: 'Invalid credentials'
      }).end()
  }

  const user = await authService.byEmail(payload.email)
  if (!user) invalidCredentials()
  const passwordMatch = await compareHashed(payload.password, user.password)
  if (passwordMatch) {
    const jwtToken = await authService.getAuthToken(user)
    res.json({
      status: 'success',
      data: {
        token: jwtToken
      }
    }).end()
  } else invalidCredentials()
}

const activate = async (req, res) => {
  const token = req.params.token
  const activeResult = await authService.activate(token)
  if (activeResult.error) {
    res.end(activeResult.message)
  } else res.end(`Account activated for ${activeResult.user.email}`)
}


module.exports = {
  register,
  login,
  activate
}
