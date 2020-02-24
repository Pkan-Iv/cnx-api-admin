import { fetchUtils } from 'react-admin'

import {
  CreateRestProvider,
  CreateRestResponse,
  CreateRestRequest
} from 'lib/factories'

import * as Config from '../../config.json'

const fetch = fetchUtils.fetchJson

/*
 *  UTILS
 */
function buildParameters (parameters) {
  return Object.keys(parameters).map(
    (key) => `${key}=${parameters[key]}`
  ).join('&')
}

/*
 *  REQUEST
 */
function getList (url, params) {
  const { filter, pagination, sort } = params
  const { page, perPage } = pagination
  const { field, order } = sort

  const filters = Object.keys( filter ).map(
    (key) => `(${key},eq,${filter[key]})`
  ).join( '~and' )

  const parameters = buildParameters({
    '_p': page,
    '_n': perPage,
    '_s': order === 'DESC' ? `-${field}` : `${field}`,
    '_w': filters !== '' ? filters : null
  })

  return fetch( `${url}?${parameters}` ).then( (response) => {
    const { json } = response,
          { count, rows } = json

    if (count < 1) {
      return {
        json: [],
        total: 0
      }
    }

    return {
      json: rows,
      total: count
    }

  })
}

/*
const requestProxy = {
  Users: {
    GET_LIST: 'users'
  }
}
*/

const requestHandler = CreateRestRequest( Config.api.url, {
  GET_LIST: getList,

  GET_ONE: (url, params) => console.log( 'GET_ONE', params ),

  GET_MANY: (url, params) => console.log( 'GET_MANY', params ),

  GET_MANY_REFERENCE: (url, params) => console.log( 'GET_MANY_REFERENCE', params ),

  UPDATE: (url, params) => console.log( 'UPDATE', params ),

  CREATE: (url, params) => console.log( 'CREATE', params ),

  DELETE: (url, params) => console.log( 'DELETE', params ),

  DELETE_MANY: (url, params) => console.log( 'DELETE_MANY', params ),
}, /* requestProxy */ )

/*
 *  RESPONSE
 */
function createOrUpdate(response, params) {
  return {
    data: {
      ...params.data,
      id: response.json.id
    }
  }
}

const responseHandler = CreateRestResponse({
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
 *  PROVIDER
 */
export default CreateRestProvider(requestHandler, responseHandler)
