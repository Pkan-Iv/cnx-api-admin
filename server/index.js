import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import fileUpload from 'express-fileupload'

import Config from '../config.json'

import email from './routes/email'
import upload from './routes/upload'


const app = express(),
      { server } = Config,
      { PORT } = server

app.use( cors() )

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use( bodyParser.json() )

app.use( fileUpload() )

app.use('/api/pra', email)
app.use('/api/pra', upload)

app.listen(PORT, () =>
  console.log(`Server is listening on port ${PORT}`)
)