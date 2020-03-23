import nodemailer from 'nodemailer'
import * as Config from '../../config.json'

const { api, server } = Config,
      { admin } = api,
      { sender, senderPass } = server

export default {
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
        console.log(info)
        (error) ? console.log(error) : console.log(`Email sent: ${info.response}`)
      })
    }
    email ? sendEMail() : console.log(`An error occured`)
    return res.status(200)
  }
}