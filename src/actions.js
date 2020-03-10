import { FetchInterface } from '../lib/interfaces'
import { USER, USERS } from './descriptors'

import { api } from '../config.json'

const Api = FetchInterface(api.url),
      Users = Api('users')

function create_user_failure (reason) {
  return {
    type: USER.CREATE.FAILURE,
    reason
  }
}

function create_user_success ({ rows }) {
  return {
    type: USER.CREATE.SUCCESS,
    rows
  }
}

export function create_user (body) {
  const request = Users(
    create_user_success,
    create_user_failure
  )

  request.setBody(body)
  return request.post()
}

function delete_user_failure (reason) {
  return {
    type: USER.DELETE.FAILURE,
    reason
  }
}

function delete_user_success ({ rows }) {
  return {
    type: USER.DELETE.SUCCESS,
    rows
  }
}

export function delete_user (id) {
  const request = Users(
    delete_user_success,
    delete_user_failure
  )

  request.addPath([id])
  return request.delete()
}

function get_users_failure (reason) {
  return {
    type: USERS.GET.FAILURE,
    reason
  }
}

function get_users_success ({ count, rows }) {
  return {
    type: USERS.GET.SUCCESS,
    count,
    rows
  }
}

export function get_users(params) {
  const request = Users(
    get_users_success,
    get_users_failure
  )

  request.setParams(params)
  return request.get()
}

function update_user_failure (reason) {
  return {
    type: USER.UPDATE.FAILURE,
    reason
  }
}

function update_user_success ({ rows }) {
  return {
    type: USER.UPDATE.SUCCESS,
    rows
  }
}

export function update_user (id, fields) {
  const request = Users(
    update_user_success,
    update_user_failure
  )

  request.addPath([ id ])
  request.setBody(fields)
  return request.patch()
}
