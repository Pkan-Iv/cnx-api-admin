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

function CreateFailureHandler (type) {
  return (reason) => {
    type,
    reason
  }
}

function CreateListHandler (type, resource) {
  return ({ rows }) => {
    return {
      type,
      resource,
      rows
    }
  }
}

function CreateResponseHandler (type) {
  return ({ rows }) => {
    return {
      type,
      rows
    }
  }
}

function CreateRowsHandler (type) {
  return ({ count, rows }) => {
    return {
      type,
      count,
      rows
    }
  }
}

const Pra = FetchInterface( `${api.url}/pra`, ApiFetchHandler),
      Accounts = Pra('accounts'),
      All = Pra('all'),
      Messages = Pra('messages'),
      Numbers = Pra('numbers'),
      Plans = Pra('plans'),
      Projects = Pra('projects')

/*
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
*/

export function get_pra_accounts () {
  const request = Accounts(
    CreateRowsHandler( PRA.GET.ACCOUNTS.SUCCESS ),
    CreateFailureHandler( PRA.GET.ACCOUNTS.FAILURE )
  )

  return request.get()
}

export function get_pra_all () {
  const request = All(
    CreateRowsHandler( PRA.GET.ALL.SUCCESS ),
    CreateFailureHandler( PRA.GET.ALL.FAILURE )
  )

  return request.get()
}

export function get_pra_messages () {
  const request = Messages(
    CreateRowsHandler( PRA.GET.MESSAGES.SUCCESS ),
    CreateFailureHandler( PRA.GET.MESSAGES.FAILURE )
  )

  return request.get()
}

export function get_pra_numbers () {
  const request = Numbers(
    CreateRowsHandler( PRA.GET.NUMBERS.SUCCESS ),
    CreateFailureHandler( PRA.GET.NUMBERS.FAILURE )
  )

  return request.get()
}

export function get_pra_plans () {
  const request = Plans(
    CreateRowsHandler( PRA.GET.PLANS.SUCCESS ),
    CreateFailureHandler( PRA.GET.PLANS.FAILURE )
  )

  return request.get()
}

export function get_pra_projects () {
  const request = Projects(
    CreateRowsHandler( PRA.GET.PROJECTS.SUCCESS ),
    CreateFailureHandler( PRA.GET.PROJECTS.FAILURE )
  )

  return request.get()
}

export function list_pra_messages () {
  const request = Messages(
    CreateListHandler( PRA.LIST.MESSAGES.SUCCESS, 'messages' ),
    CreateFailureHandler( PRA.LIST.MESSAGES.FAILURE )
  )

  return request.get()
}

export function list_pra_numbers () {
  const request = Numbers(
    CreateListHandler( PRA.LIST.NUMBERS.SUCCESS, 'numbers' ),
    CreateFailureHandler( PRA.LIST.NUMBERS.FAILURE )
  )

  return request.get()
}

export function list_pra_plans () {
  const request = Plans(
    CreateListHandler( PRA.LIST.PLANS.SUCCESS, 'plans' ),
    CreateFailureHandler( PRA.LIST.PLANS.FAILURE )
  )

  return request.get()
}

export function list_pra_projects () {
  const request = Projects(
    CreateListHandler( PRA.LIST.PROJECTS.SUCCESS, 'projects' ),
    CreateFailureHandler( PRA.LIST.PROJECTS.FAILURE )
  )

  return request.get()
}

function post_credentials_success (data) {
  return {
    type: CREDENTIALS.POST.SUCCESS,
    data
  }
}

export function post_credentials ({ username, password }) {
  const request = Accounts(
    post_credentials_success,
    CreateFailureHandler( CREDENTIALS.POST.FAILURE )
  )

  request.setBody({ username, password })
  return request.post()
}
