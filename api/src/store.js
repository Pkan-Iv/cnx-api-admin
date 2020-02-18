import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import ThunkMiddleware from 'redux-thunk'

import { ErrorMiddleware, LogMiddleware } from '../lib/middlewares'
import { ActionReducer, } from '../lib/reducers'
import { CountReducer, ErrorReducer, RowsReducer } from './reducers'

const reducers = combineReducers({
  action: ActionReducer,
  count: CountReducer,
  error: ErrorReducer,
  rows: RowsReducer
})

export default function CreateStore (routerMiddleware) {
  const middlewares = compose( applyMiddleware(
    ThunkMiddleware,
    ErrorMiddleware,
    LogMiddleware,

    routerMiddleware
  ))

  return createStore( reducers, middlewares )
}
