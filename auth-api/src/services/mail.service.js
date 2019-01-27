
const nodeMailer = require('nodemailer')
  , config = require('../config')


const sendActivationUrl = async (user, url) => {
  const transporter = _getMailTransporter()
  return transporter.sendMail({
    from: config.email.user,
    to: user.email,
    subject: 'Account activation',
    text: `Follow this url to activate your account: ${url}`
  })

}

const _getMailTransporter = () => {
  return nodeMailer.createTransport({
    service: config.email.service,
    auth: {
      user: config.email.user,
      pass: config.email.password
    }
  })
}

module.exports = {
  sendActivationUrl
}
