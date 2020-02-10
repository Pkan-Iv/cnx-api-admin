import { connect } from 'react-redux'

import { MergeObject } from './utils'

const combine = (mutators) => mutators.length ? MergeObject( mutators ) : ({})
const mapper = () => ({})
const stay = (state) => state

export function ConnectMutator (mutator, ...descriptors) {
  return descriptors.reduce( (a, b) => ({ ...a, [ b ]: mutator }), {} )
}

export const CreateConnector = (state = mapper, dispatch = mapper) => {
  const connector = connect( state, dispatch )
  return (container) => connector( container )
}

export function CreateDispatchMiddleware (...actions) {
  const dispatchers = combine( actions )

  return ({ dispatch }) => (next) => (payload) => {
    const { type } = payload,
          callback = dispatchers[ type ],
          result = next( payload )

    if (callback !== undefined) {
      if (typeof callback === 'function')
        dispatch(callback())
      else
        dispatch({ type: callback })
    }

    return result
  }
}

export function CreateHookReducer (...mutators) {
  const handlers = combine( mutators )

  return (state, payload) => {
    const handler = handlers[ payload.type ] || stay
    return handler( state, payload )
  }
}

export function CreatePubSubMiddleware (publisher, ...callbacks) {
  const handlers = combine( callbacks )

  return (store) => {
    const publishers = publisher( store )

    return (next) => (payload) => {
      const result = next( payload ),
            { type } = payload

      if (handlers[ type ] !== undefined)
        publishers[handlers[ type ]]( payload )

      return result
    }
  }
}

export function CreateReducer (initial = null, unchanged = stay) {
  return (...mutators) => {
    const handlers = combine( mutators )

    return (state = initial, payload) => {
      const handler = handlers[ payload.type ] || unchanged
      return handler( state, payload )
    }
  }
}
