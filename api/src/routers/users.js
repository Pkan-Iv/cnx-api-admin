import Express from 'express'

import {
  CreateResponseHandler,
  CreateRouterMiddleware
} from '../../lib/factories'

import CreateActions from '../actions/users'
import { USERS } from '../descriptors'
import CreateStore from '../store'

export default function (pool) {
  const { count, get } = CreateActions( pool ),
        router = Express.Router()

  // GET /users
  router.get( '/', ({ body, query }, res) => {
    const response = CreateResponseHandler( res )

    const { dispatch } = CreateStore( CreateRouterMiddleware({
      // COUNT
      [ USERS.COUNT.FAILURE ]: ({ error }) => response({ reason: error }, 500 ),
      [ USERS.COUNT.SUCCESS ]: () => dispatch(get( query )),

      // GET
      [ USERS.GET.FAILURE ]: ({ error }) => response({ reason: error }, 404 ),
      [ USERS.GET.SUCCESS ]: ({ count, rows }) => response({ count, rows })
    }))

    dispatch(count( query ))
  })

  return router
}
