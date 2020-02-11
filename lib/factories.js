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

export function CreateRestProvider (requestHandler, responseHandler) {
  return (type, resource, params) => {
    return requestHandler( type, resource, params ).then(
      (response) => responseHandler( response, type, resource, params )
    )
  }
}
export function CreateRestResponse (handlers) {
  return (response, type, params) => {
    const handler = handlers[ type ]

    if (handler === undefined) {
      return { data: response.json }
    }

    return handler( response, params )
  }
}

export function CreateRestRequest (url, handlers, replaces) {
  return (type, resource, params) => {
    const handler = handlers[ type ],
          target = [ url ]

    if (handler === undefined) {
      throw new Error( `Unsupported fetch action type ${type}` )
    }

    if (resource in replaces && type in replaces[resource]) {
      target.push( replaces[resource][type] )
    }
    else {
      target.push( resource )
    }

    return handler( target.join( '/' ), params )
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
