import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import ThunkMiddleware from 'redux-thunk'

import {
  ErrorMiddleware
} from '../lib/middlewares'

import {
  ActionReducer,
} from '../lib/reducers'

import {
  ContextReducer,
  CountReducer,
  ReasonReducer,
  RowsReducer
} from './reducers'

const composer = WEBPACK_MODE === 'development' ? composeWithDevTools : compose

const middlewares = composer( applyMiddleware(
  ThunkMiddleware,
  ErrorMiddleware
))

const reducers = combineReducers({
  action: ActionReducer,
  context: ContextReducer,
  count: CountReducer,
  reason: ReasonReducer,
  rows: RowsReducer
})

export default createStore( reducers, middlewares )
