const mailer = require('nodemailer')
const logger = require('winston').loggers.get('logger')
const config = require('getconfig')

const sendMessage = async (name, telephone, email, message) => {
  const transporter = mailer.createTransport({
    host: config.mail.server,
    port: config.mail.port,
    secure: config.mail.secure,
    auth: {
      user: config.mail.user,
      pass: config.mail.password,
    }
  });

  const info = await transporter.sendMail({
    from: config.mail.user,
    to: config.mail.recipients,
    subject: 'Job Query',
    html: `${name} has sent you a message using the website.<br/>Phone Number: ${telephone}<br/>Email: ${email}<br/>Message: <br/> ${message}`,
  });

  logger.info("Message sent: %s", info.messageId);
}

module.exports = {
  sendMessage: sendMessage
}