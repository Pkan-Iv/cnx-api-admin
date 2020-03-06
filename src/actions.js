import { FetchInterface } from '../lib/interfaces'
import { USERS } from './descriptors'

import { api } from '../config.json'

const Api = FetchInterface( api.url ),
      Users = Api( 'users' )

function create_users_failure (reason) {
  console.log(`Failure`)
  return {
    type: USERS.CREATE.FAILURE,
    reason
  }
}

function create_users_success ({ count, rows }) {
  console.log(`Success`)
  return {
    type: USERS.CREATE.SUCCESS,
    row: rows[0]
  }
}


export function create_users () {
  const request = Users(
    create_users_success,
    create_users_failure
  )

  request.addPath()
  return request.post()
}

function delete_all_users_failure (reason) {
  return {
    type: USERS.DELETE.ALL.FAILURE,
    reason
  }
}

function delete_all_users_success ({ count, rows }) {
  return {
    type: USERS.DELETE.ALL.SUCCESS,
    count,
    rows
  }
}

export function delete_all_users (params) {
  const request = Users(
    delete_all_users_success,
    delete_all_users_failure
  )

  request.setParams( params )
  return request.delete()
}

function delete_one_users_failure (reason) {
  return {
    type: USERS.DELETE.ONE.FAILURE,
    reason
  }
}

function delete_one_users_success ({ rows }) {
  return {
    type: USERS.DELETE.ONE.SUCCESS,
    row: rows[0]
  }
}

export function delete_one_users ({ id }) {
  const request = Users(
    delete_one_users_success,
    delete_one_users_failure
  )

  request.addPath([ id ])
  return request.delete()
}

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

function update_all_users_failure (reason) {
  return {
    type: USERS.UPDATE.ALL.FAILURE,
    reason
  }
}

function update_all_users_success ({ count, rows }) {
  return {
    type: USERS.UPDATE.ALL.SUCCESS,
    count,
    rows
  }
}

export function update_all_users (params) {
  const request = Users(
    update_all_users_success,
    update_all_users_failure
  )

  request.setParams( params )
  return request.patch()
}

function update_one_users_failure (reason) {
  return {
    type: USERS.UPDATE.ONE.FAILURE,
    reason
  }
}

function update_one_users_success ({ rows }) {
  return {
    type: USERS.UPDATE.ONE.SUCCESS,
    row: rows[0]
  }
}

export function update_one_users ({ id }) {
  const request = Users(
    update_one_users_success,
    update_one_users_failure
  )

  request.addPath([ id ])
  return request.patch()
}
