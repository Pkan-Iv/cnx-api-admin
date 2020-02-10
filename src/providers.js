import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
  DELETE_MANY,
  fetchUtils,
} from 'react-admin'

import * as Config from '../config.json'

const fetch = fetchUtils.fetchJson

/*
 *  UTILS
 */
function buildParameters (parameters) {
  return Object.keys( parameters ).map(
    (key) => `${key}=${parameters[key]}`
  ).join( '&' )
}

function providerCreator (requestHandler, responseHandler) {
  return (type, resource, params) => {
    return requestHandler( type, resource, params ).then(
      (response) => responseHandler( response, type, resource, params )
    )
  }
}

function requestCreator (url, handlers) {
  return (type, resource, params) => {
    const handler = handlers[ type ]

    if (handler === undefined) {
      throw new Error( `Unsupported fetch action type ${type}` )
    }

    return handler( `${url}/${resource}`, params )
  }
}

function jsonResponseCreator (handlers) {
  return (response, type, params) => {
    const handler = handlers[ type ]

    if (handler === undefined) {
      return { data: response.json }
    }

    return handler( response, params )
  }
}

/*
 *  REQUEST
 */
function getList (url, params) {
  return fetch( `${url}/count` ).then( (response) => {
    const { no_of_rows } = response.json[0]
    const count = parseInt( no_of_rows, 10 )

    if (count < 1) {
      return {
        json: [],
        total: 0
      }
    }

    const { page, perPage } = params.pagination
    const { field, order } = params.sort

    const parameters = buildParameters({
      'p': page - 1,
      '_size': perPage,
      '_sort': order === 'DESC' ? '-' : ''
    })

    return fetch(
      `${url}?${parameters}${field}`
    ).then( (response) => {
      response.total = count
      return response
    })
  })
}

function getManyReference (url, params) {
  return fetch( `${url}/count` ).then( (response) => {
    const { no_of_rows } = response.json[0]
    const count = parseInt( no_of_rows, 10 )

    if (count < 1) {
      return {
        data: [],
        total: 0
      }
    }

    const { page, perPage } = params.pagination
    const { field, order } = params.sort

    const parameters = buildParameters({
      'p': page - 1,
      '_size': perPage,
      '_sort': order === 'DESC' ? '-' : '',
      '_where': `(${params.target},eq,${params.id})`
    })

    return fetch(
      `${url}?${parameters}${field}`
    )
  })
}

const requestHandler = requestCreator( Config.api.url, {
  GET_LIST: getList,

  GET_ONE: (url, params) => fetch(
    `${url}/${params.id}`
  ),

  GET_MANY: (url, params) => fetch(
    `${url}/bulk/?_ids=${params.ids.join( ',' )}`
  ),

  GET_MANY_REFERENCE: getManyReference,

  UPDATE: (url, params) => fetch( `${url}/${params.id}`, {
    method: 'PATCH',
    body: JSON.stringify( params.data )
  }),

  CREATE: (url, params) => fetch( `${url}`, {
    method: 'POST',
    body: JSON.stringify( params.data ),
  }),

  DELETE: (url, params) => fetch( `${url}/${params.id}`, {
    method: 'DELETE'
  }),

  DELETE_MANY: (url, params) => fetch(
    `${url}/bulk/?_ids=${params.ids.join( ',' )}`, {
      method: 'DELETE'
    }
  )
})

/*
 *  RESPONSE
 */
function createOrUpdate (response, params) {
  return {
    data: {
      ...params.data,
      id: response.json.id
    }
  }
}

const responseHandler = jsonResponseCreator({
  GET_LIST: (response) => ({
    data: response.json,
    total: response.total
  }),

  CREATE: createOrUpdate,
  UPDATE: createOrUpdate,

  GET_ONE: (response) => ({
    data: response.json[0]
  })
})

/*
 *  PROOVIDER
 */
export default providerCreator( requestHandler, responseHandler)
