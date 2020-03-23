import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import nodemailer from 'nodemailer'

import * as Config from '../config.json'

const app = express(),
      { server } = Config,
      { PORT, pass, user } = server

app.use( cors() )

app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use( bodyParser.json )

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: user,
    pass: pass
  }
}),
mailOptions = {
  from: user,
  to: 'patrick.kaninda@interactiv-group.com',
  subject: 'Sending Email using Node.js, Expres and nodemailer',
  text: 'Test 01'
}

transporter.sendMail ( mailOptions, (error, info) => {
  (error) ? console.log(error) : console.log(`Email sent: ${ info.response }`)
})

app.listen(PORT, () =>
  console.log(`App is listening on port ${PORT}`)
)