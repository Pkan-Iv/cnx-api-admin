import { FetchInterface } from 'lib/interfaces'

import {
  CREDENTIALS,
  PRA
} from './descriptors'

import { api } from '../config.json'

const validStatus = [ 200, 201, 204 ]

function FetchHandler () {
  return async (response) => {
    const { status } = response

    if (validStatus.indexOf( status ) === -1) {
      throw new Error( status )
    }

    const result = status === 204 ? {} : await response.json()
    return result
  }
}

function CreateDeleteAction (resource, success, failure) {
  return (id) => {
    const request = resource( success, failure )

    request.addPath([ id ])
    return request.delete()
  }
}

function CreateGetAction (resource, success, failure) {
  return () => {
    const request = resource( success, failure )
    return request.get()
  }
}

function CreatePatchAction (resource, success, failure) {
  return (values, id) => {
    const request = resource( success, failure )

    request.addPath([ id ])
    request.setBody( values )
    return request.patch()
  }
}

function CreatePostAction (resource, success, failure) {
  return (values) => {
    const request = resource( success, failure )

    request.setBody( values )
    return request.post()
  }
}

function CreateFailureHandler (type) {
  return (reason) => ({
    type,
    reason
  })
}

function CreateListHandler (type, resource) {
  return ({ rows }) => ({
    type,
    resource,
    rows
  })
}

function CreateTableHandler (type) {
  return ({ count, rows }) => ({
    type,
    count,
    rows
  })
}

function CreateRowsHandler (type) {
  return ({ rows }) => ({
    type,
    rows
  })
}

const Pra = FetchInterface( `${api.url}/pra`, FetchHandler ),
      Accounts = Pra( 'accounts' ),
      All = Pra( 'all' ),
      Credentials = Pra( 'credentials' ),
      Messages = Pra( 'messages' ),
      Numbers = Pra( 'numbers' ),
      Plans = Pra( 'plans' ),
      Projects = Pra( 'projects' ),
      Roles = Pra( 'roles' )

/*
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

export const delete_pra_accounts = CreateDeleteAction( Accounts,
  CreateRowsHandler( PRA.DELETE.ACCOUNTS.SUCCESS ),
  CreateFailureHandler( PRA.DELETE.ACCOUNTS.FAILURE )
)

export const get_pra_accounts = CreateGetAction( Accounts,
  CreateTableHandler( PRA.GET.ACCOUNTS.SUCCESS ),
  CreateFailureHandler( PRA.GET.ACCOUNTS.FAILURE )
)

export const get_pra_all = CreateGetAction( All,
  CreateTableHandler( PRA.GET.ALL.SUCCESS ),
  CreateFailureHandler( PRA.GET.ALL.FAILURE )
)

export const get_pra_messages = CreateGetAction( Messages,
  CreateTableHandler( PRA.GET.MESSAGES.SUCCESS ),
  CreateFailureHandler( PRA.GET.MESSAGES.FAILURE )
)

export const get_pra_numbers = CreateGetAction( Numbers,
  CreateTableHandler( PRA.GET.NUMBERS.SUCCESS ),
  CreateFailureHandler( PRA.GET.NUMBERS.FAILURE )
)

export const get_pra_plans = CreateGetAction( Plans,
  CreateTableHandler( PRA.GET.PLANS.SUCCESS ),
  CreateFailureHandler( PRA.GET.PLANS.FAILURE )
)

export const get_pra_projects = CreateGetAction( Projects,
  CreateTableHandler( PRA.GET.PROJECTS.SUCCESS ),
  CreateFailureHandler( PRA.GET.PROJECTS.FAILURE )
)

export const list_pra_messages = CreateGetAction( Messages,
  CreateListHandler( PRA.LIST.MESSAGES.SUCCESS, 'messages' ),
  CreateFailureHandler( PRA.LIST.MESSAGES.FAILURE )
)

export const list_pra_numbers = CreateGetAction( Numbers,
  CreateListHandler( PRA.LIST.NUMBERS.SUCCESS, 'numbers' ),
  CreateFailureHandler( PRA.LIST.NUMBERS.FAILURE )
)

export const list_pra_plans = CreateGetAction( Plans,
  CreateListHandler( PRA.LIST.PLANS.SUCCESS, 'plans' ),
  CreateFailureHandler( PRA.LIST.PLANS.FAILURE )
)

export const list_pra_projects = CreateGetAction( Projects,
  CreateListHandler( PRA.LIST.PROJECTS.SUCCESS, 'projects' ),
  CreateFailureHandler( PRA.LIST.PROJECTS.FAILURE )
)

export const list_pra_roles = CreateGetAction( Roles,
  CreateListHandler( PRA.LIST.ROLES.SUCCESS, 'roles' ),
  CreateFailureHandler( PRA.LIST.ROLES.FAILURE )
)

export const patch_pra_accounts = CreatePatchAction( Accounts,
  CreateRowsHandler( PRA.PATCH.ACCOUNTS.SUCCESS ),
  CreateFailureHandler( PRA.PATCH.ACCOUNTS.FAILURE )
)

export const post_pra_accounts = CreatePostAction( Accounts,
  CreateRowsHandler( PRA.POST.ACCOUNTS.SUCCESS ),
  CreateFailureHandler( PRA.POST.ACCOUNTS.FAILURE )
)

export const post_credentials = CreatePostAction( Credentials,
  (data) => ({ type: CREDENTIALS.POST.SUCCESS, data }),
  CreateFailureHandler( CREDENTIALS.POST.FAILURE )
)
