import BodyParser from 'body-parser'
import Compression from 'compression'
import Cors from 'cors'
import Express from 'express'
import Mysql from 'mysql'

import { mysql, proxy } from './config.json'
import Users from './src/routers/users'

const Http = Express(),
      MysqlPool = Mysql.createPool( mysql )

Http.use(BodyParser.urlencoded({ extended: true }))
Http.use(BodyParser.json())
Http.use(Compression())
Http.use(Cors())

Http.use( (req, res, next) => {
  res.set({ 'Content-Type': 'application/json' })
  return next()
})

Http.use( '/users', Users( MysqlPool ))

Http.listen( proxy.port, proxy.host, () => {
  const { host, port } = proxy
  console.log( `cnx-api-proxy started on ${host}:${port}` )
})
