import * as Config from '../../config.json'

import nodemailer from 'nodemailer'
import shortId from 'shortid'

const { api, server } = Config,
      { admin } = api,
      { sender, senderPass } = server,
      token = shortId.generate()

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

    const validateEmail = (mail) => {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (mailformat.test(String(email).toLowerCase()))
        {
          return (true)
        }
          console.log("You have entered an invalid email address!")
          return (false)
      }


    const sendEMail = () => {
      if(validateEmail(email)) {
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
      } else{
      return res.status(500).json({ msg: `You have entered an invalid email address!`})
      }
    }
    sendEMail()
  },

  getEmailToken(req, res) {
    req.body = token
    console.log('Token:',token)
    return res.status(200).json({
      message: 'Token provided',
      token: token
    })
  }
}