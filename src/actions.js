import { FetchInterface } from '../lib/interfaces'
import { PROJECTS, USERS, WHITELABELS } from './descriptors'

import { api } from '../config.json'

const Api = FetchInterface(api.url),
  Projects = Api('projects'),
  Users = Api('users'),
  Whitelabels = Api('whitelabels')

function get_all_projects_failure(reason) {
  return {
    type: PROJECTS.GET.ALL.FAILURE,
    reason
  }
}

function get_all_projects_success({ count, rows }) {
  return {
    type: PROJECTS.GET.ALL.SUCCESS,
    count,
    rows
  }
}

export function get_all_projects(params) {
  const request = Projects(
    get_all_projects_success,
    get_all_projects_failure
  )

  request.setParams(params)
  return request.get()
}

function create_user_failure(reason) {
  return {
    type: USERS.CREATE.FAILURE,
    reason
  }
}

export function create_user_success({ rows }) {
  return {
    type: USERS.CREATE.SUCCESS,
    row: rows[0]
  }
}


export function create_user(body) {
  const request = Users(
    create_user_success,
    create_user_failure
  )
  request.setBody(body)
  return request.post()
}

function delete_one_users_failure(reason) {
  return {
    type: USERS.DELETE.ONE.FAILURE,
    reason
  }
}

function delete_one_users_success({ rows }) {
  return {
    type: USERS.DELETE.ONE.SUCCESS,
    row: rows[0]
  }
}

export function delete_one_users(id) {
  const request = Users(
    delete_one_users_success,
    delete_one_users_failure
  )

  request.addPath([id])
  return request.delete()
}

function get_all_users_failure(reason) {
  return {
    type: USERS.GET.ALL.FAILURE,
    reason
  }
}

function get_all_users_success({ count, rows }) {
  return {
    type: USERS.GET.ALL.SUCCESS,
    count,
    rows
  }
}

export function get_all_users(params) {
  const request = Users(
    get_all_users_success,
    get_all_users_failure
  )

  request.setParams(params)
  return request.get()
}

function get_one_user_failure(reason) {
  return {
    type: USERS.GET.ONE.FAILURE,
    reason
  }
}

function get_one_user_success({ rows }) {
  return {
    type: USERS.GET.ONE.SUCCESS,
    row: rows[0]
  }
}

export function get_user(id) {
  const request = Users(
    get_one_user_success,
    get_one_user_failure
  )

  request.addPath([id])
  return request.get()
}

function update_user_failure(reason) {
  return {
    type: USERS.UPDATE.ONE.FAILURE,
    reason
  }
}

function update_user_success({ rows }) {
  return {
    type: USERS.UPDATE.ONE.SUCCESS,
    row: rows[0]
  }
}

export function update_user(id, body) {
  const request = Users(
    update_user_success,
    update_user_failure
  )

  request.addPath([id])
  request.setBody(body)
  return request.patch()
}

function get_all_whitelabels_failure(reason) {
  return {
    type: WHITELABELS.GET.ALL.FAILURE,
    reason
  }
}

function get_all_whitelabels_success({ count, rows }) {
  return {
    type: WHITELABELS.GET.ALL.SUCCESS,
    count,
    rows
  }
}

export function get_all_whitelabels(params) {
  const request = Whitelabels(
    get_all_whitelabels_success,
    get_all_whitelabels_failure
  )

  request.setParams(params)
  return request.get()
}