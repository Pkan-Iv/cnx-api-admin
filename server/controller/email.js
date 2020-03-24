import nodemailer from 'nodemailer'
import * as Config from '../../config.json'

const { api, server } = Config,
      { admin } = api,
      { sender, senderPass } = server

export default {
  // TODO
  /**
   * Create a unique url link to send
   * Email exist in Db
   * Email is a match
   * */
  getEmail (req, res) {
    const { email } = req.body
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
      subject: 'Sending Email using Node.js, Express and nodemailer',
      text: 'Test 01'
    }

    const sendEMail = () => {
      transporter.sendMail(mailOptions, (error, info) => {
        (error) ? res.status(500).json(`An error occured while sending the email, ${error}`) : res.status(200).json({ message: `** Email sent: ${info.response} **` })
      })
    }
    sendEMail()
  }
}