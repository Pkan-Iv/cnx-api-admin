import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

import * as Config from '../config.json'

const app = express(),
      { server } = Config,
      { PORT } = server

app.use( cors() )

app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use( bodyParser.json )

app.listen(PORT, () =>
  console.log(`App is listening on port ${PORT}`)
)