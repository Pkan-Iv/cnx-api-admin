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
function buildParameters(parameters) {
  return Object.keys(parameters).filter(
    (key) => parameters[key] !== null
  ).map(
    (key) => `${key}=${parameters[key]}`
  ).join('&')
}

/*
 *  REQUEST
 */

function create(url, params) {
  const { data } = params

  return fetch(`${url}`, {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(({ json }) => {
    const { rows } = json
    return {
      data: rows[0]
    }
  })
}

function deleteOne(url, params) {
  const { id, previousData } = params

  return fetch(`${url}/${id}`, {
    method: 'DELETE',
  }).then((response) => {
        return {
          ...response,
          json: {
            ...previousData
          }
      }
    })
}

function getList(url, params) {
  const { filter, pagination, sort } = params
  const { page, perPage } = pagination
  const { field, order } = sort

  const filters = Object.keys(filter).map(
    (key) => `(${key},eq,${filter[key]})`
  ).join('~and')

  const parameters = buildParameters({
    '_p': page,
    '_n': perPage,
    '_s': order === 'DESC' ? `-${field}` : `${field}`,
    '_w': filters !== '' ? filters : null
  })

  return fetch(`${url}?${parameters}`).then((response) => {
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

function getOne(url, params) {

  const { id } = params

  return fetch(`${url}/${id}`).then((response) => {
    const { json } = response,
      { rows } = json
    return rows[0]
  })

}

function update(url, params) {
  const { data, id } = params

  console.log(params)

  return fetch(`${url}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  }).then((response) => {
    console.log(response)
    return {
      json: data
    }
  }).catch(e => console.log(e))
}

/*
const requestProxy = {
  Users: {
    GET_LIST: 'users'
  }
}
*/

const requestHandler = CreateRestRequest(Config.api.url, {
  GET_LIST: getList,

  GET_ONE: getOne,

  GET_MANY: (url, params) => console.log('GET_MANY', params),

  GET_MANY_REFERENCE: (url, params) => console.log('GET_MANY_REFERENCE', params),

  UPDATE: update,

  CREATE: create,

  DELETE: deleteOne,

  DELETE_MANY: (url, params) => console.log('DELETE_MANY', params),
})

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

  CREATE: (response) => ({
    data: response.data
  }),

  DELETE: (response) => ({
    data: response.json
  }),

  GET_LIST: (response) => ({
    data: response.json,
    total: response.total
  }),

  GET_ONE: (response) => ({
    data: response
  }),

  UPDATE: (response) =>  ({
    data:response.json
  }),

})

/*
 *  PROVIDER
 */
export default CreateRestProvider(requestHandler, responseHandler)
