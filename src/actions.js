import { FetchInterface } from 'lib/interfaces'

import {
  CREDENTIALS,
  LANGUAGES,
  PRA,
  PROJECTS,
  TYPES,
  USER,
  USERS
} from './descriptors'

import { api } from '../config.json'

const validStatus = [ 200, 201, 204 ]

function ApiFetchHandler () {
  return async (response) => {
    const { status } = response

    if (validStatus.indexOf( status ) === -1) {
      throw new Error( status )
    }

    const result = status === 204 ? {} : await response.json()
    return result
  }
}

const Api = FetchInterface(api.url, ApiFetchHandler),
      Languages = Api('languages'),
      PraAccounts = Api('pra_accounts'),
      PraAll = Api('pra_all'),
      PraMessages = Api('pra_messages'),
      PraNumbers = Api('pra_numbers'),
      PraPlans = Api('pra_plans'),
      PraProjects = Api('pra_projects'),
      Projects = Api('projects'),
      Types = Api('types'),
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

export function create_user (values) {
  const request = Users(
    create_user_success,
    create_user_failure
  )

  request.setBody( values )
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

function get_languages_failure (reason) {
  return {
    type: LANGUAGES.GET.FAILURE,
    reason
  }
}

function get_languages_success ({ rows }) {
  return {
    type: LANGUAGES.GET.SUCCESS,
    resource: 'languages',
    rows
  }
}

export function get_languages () {
  const request = Languages(
    get_languages_success,
    get_languages_failure
  )

  return request.get()
}

function get_pra_all_failure (reason) {
  return {
    type: PRA.GET.ALL.FAILURE,
    reason
  }
}

function get_pra_all_success ({ count, rows }) {
  return {
    type: PRA.GET.ALL.SUCCESS,
    count,
    rows
  }
}

export function get_pra_all () {
  const request = PraAll(
    get_pra_all_success,
    get_pra_all_failure
  )

  return request.get()
}

function get_pra_messages_failure (reason) {
  return {
    type: PRA.GET.MESSAGES.FAILURE,
    reason
  }
}

function get_pra_messages_success ({ count, rows }) {
  return {
    type: PRA.GET.MESSAGES.SUCCESS,
    count,
    rows
  }
}

export function get_pra_messages () {
  const request = PraMessages(
    get_pra_messages_success,
    get_pra_messages_failure
  )

  return request.get()
}

function get_pra_numbers_failure (reason) {
  return {
    type: PRA.GET.NUMBERS.FAILURE,
    reason
  }
}

function get_pra_numbers_success ({ count, rows }) {
  return {
    type: PRA.GET.NUMBERS.SUCCESS,
    count,
    rows
  }
}

export function get_pra_numbers () {
  const request = PraNumbers(
    get_pra_numbers_success,
    get_pra_numbers_failure
  )

  return request.get()
}

function get_pra_plans_failure (reason) {
  return {
    type: PRA.GET.PLANS.FAILURE,
    reason
  }
}

function get_pra_plans_success ({ count, rows }) {
  return {
    type: PRA.GET.PLANS.SUCCESS,
    count,
    rows
  }
}

export function get_pra_plans () {
  const request = PraPlans(
    get_pra_plans_success,
    get_pra_plans_failure
  )

  return request.get()
}

function get_pra_projects_failure (reason) {
  return {
    type: PRA.GET.PROJECTS.FAILURE,
    reason
  }
}

function get_pra_projects_success ({ count, rows }) {
  return {
    type: PRA.GET.PROJECTS.SUCCESS,
    count,
    rows
  }
}

export function get_pra_projects () {
  const request = PraProjects(
    get_pra_projects_success,
    get_pra_projects_failure
  )

  return request.get()
}

function get_projects_failure (reason) {
  return {
    type: PROJECTS.GET.FAILURE,
    reason
  }
}

function get_projects_success ({ rows }) {
  return {
    type: PROJECTS.GET.SUCCESS,
    resource: 'projects',
    rows
  }
}

export function get_projects () {
  const request = Projects(
    get_projects_success,
    get_projects_failure
  )

  return request.get()
}

function get_types_failure (reason) {
  return {
    type: TYPES.GET.FAILURE,
    reason
  }
}

function get_types_success ({ rows }) {
  return {
    type: TYPES.GET.SUCCESS,
    resource: 'types',
    rows
  }
}

export function get_types () {
  const request = Types(
    get_types_success,
    get_types_failure
  )

  return request.get()
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

export function get_users (params) {
  const request = Users(
    get_users_success,
    get_users_failure
  )

  request.setParams(params)
  return request.get()
}

function post_credentials_failure (reason) {
  return {
    type: CREDENTIALS.POST.FAILURE,
    reason
  }
}

function post_credentials_success (data) {
  return {
    type: CREDENTIALS.POST.SUCCESS,
    data
  }
}

export function post_credentials ({ username, password }) {
  const request = PraAccounts(
    post_credentials_success,
    post_credentials_failure
  )

  request.setBody({ username, password })
  return request.post()
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

export function update_user (values, id) {
  const request = Users(
    update_user_success,
    update_user_failure
  )

  request.addPath([ id ])
  request.setBody( values )
  return request.patch()
}
