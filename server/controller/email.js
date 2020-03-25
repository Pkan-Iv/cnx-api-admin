import * as Config from '../../config.json'

import nodemailer from 'nodemailer'
import shortId from 'shortid'

const { api, server } = Config,
      { admin } = api,
      { sender, senderPass } = server

export default {
  // TODO
  /**
   * Create a unique url link to send
   * Email exist in DB
   * Email is a match
   * Display display_name in template
   * */
  getEmail (req, res) {
    const { email } = req.body,
          token = shortId.generate(),
          html = `<p>You can use the following link to reset your password:</p>
                  <a href=${admin}/?t=${token}>${admin}/?t=${token}</a>`
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: sender,
        pass: senderPass
      }
    }),
    mailOptions = {
      from: sender,
      to: email,
      subject: '[PASSWORD RESET]',
      html: html
    }

    const sendEMail = () => {
      transporter.sendMail(mailOptions, (error, info) => {
        (error)
        ? (
          console.log(`ERROR: ${ error }`),
          res.status(500)
          .json(`An error occured while sending the email, ${ error }`)
        )
        : (
          console.log(`INFO:     Message sent to ${ email } succesfully.
          ${ info.response }`),
          res.status(200)
          .json({ message: `** Email sent: ${ info.response } **` })
        )
      })
    }
    sendEMail()
  }
}