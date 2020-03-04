import { FetchInterface } from '../lib/interfaces'
import { USERS } from './descriptors'

import { api } from '../config.json'

const Api = FetchInterface( api.url ),
      Users = Api( 'users' )

function get_all_users_failure (reason) {
  return {
    type: USERS.GET.ALL.FAILURE,
    reason
  }
}

function get_all_users_success ({ count, rows }) {
  return {
    type: USERS.GET.ALL.SUCCESS,
    count,
    rows
  }
}

export function get_all_users (params) {
  const request = Users(
    get_all_users_success,
    get_all_users_failure
  )

  request.setParams( params )
  return request.get()
}

function get_one_users_failure (reason) {
  return {
    type: USERS.GET.ONE.FAILURE,
    reason
  }
}

function get_one_users_success ({ rows }) {
  return {
    type: USERS.GET.ONE.SUCCESS,
    row: rows[0]
  }
}

export function get_one_users ({ id }) {
  const request = Users(
    get_one_users_success,
    get_one_users_failure
  )

  request.addPath([ id ])
  return request.get()
}
