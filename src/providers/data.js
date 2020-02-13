import { fetchUtils } from 'react-admin'

import {
  CreateRestProvider,
  CreateRestResponse,
  CreateRestRequest
} from '../../lib/factories'

import * as Config from '../../config.json'

const fetch = fetchUtils.fetchJson

/*
 *  UTILS
 */
function buildParameters(parameters) {
  return Object.keys(parameters).map(
    (key) => `${key}=${parameters[key]}`
  ).join('&')
}

/*
 *  REQUEST
 */
function getList(url, params) {
  return fetch(`${url}/count`).then((response) => {

    const { no_of_rows } = response.json[0]
    const count = parseInt(no_of_rows, 10)

    if (count < 1) {
      return {
        json: [],
        total: 0
      }
    }

    const { filter, pagination, sort} = params
    const { page, perPage } = pagination
    const { field, order } = sort

    const filters = Object.keys( filter ).map(
      (key) => `(${key},like,~${filter[key]}~)`
    ).join( '~and' )

    const parameters = buildParameters({
      '_p': page - 1,
      '_size': perPage,
      '_sort': order === 'DESC' ? `-${field}` : `${field}`,
      '_where': filters !== '' ? filters : null
    })

    return fetch(
      `${url}?${parameters}`
    ).then((response) => {
      response.total = count
      return response
    })
  })
}

function getManyReference(url, params) {
  return fetch(`${url}/count`).then((response) => {
    const { no_of_rows } = response.json[0]
    const count = parseInt(no_of_rows, 10)

    if (count < 1) {
      return {
        data: [],
        total: 0
      }
    }

    const { page, perPage } = params.pagination
    const { field, order } = params.sort

    const parameters = buildParameters({
      '_p': page - 1,
      '_size': perPage,
      '_sort': order === 'DESC' ? '-' : '',
      '_where': `(${params.target},eq,${params.id})`
    })

    return fetch(
      `${url}?${parameters}${field}`
    )
  })
}

const requestProxy = {
  Users: {
    GET_LIST: 'XM_Users',
    GET_MANY_REFERENCE: 'XM_Users'
  }
}

const requestHandler = CreateRestRequest(Config.api.url, {
  GET_LIST: getList,

  GET_ONE: (url, params) => fetch(
    `${url}/${params.id}`
  ),

  GET_MANY: (url, params) => fetch(
    `${url}/bulk/?_ids=${params.ids.join(',')}`
  ),

  GET_MANY_REFERENCE: getManyReference,

  UPDATE: (url, params) => fetch(`${url}/${params.id}`, {
    method: 'PATCH',
    body: JSON.stringify(params.data)
  }),

  CREATE: (url, params) => fetch(`${url}`, {
    method: 'POST',
    body: JSON.stringify(params.data),
  }),

  DELETE: (url, params) => fetch(`${url}/${params.id}`, {
    method: 'DELETE'
  }),

  DELETE_MANY: (url, params) => fetch(
    `${url}/bulk/?_ids=${params.ids.join(',')}`, {
    method: 'DELETE'
  }
  )
}, requestProxy)

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
