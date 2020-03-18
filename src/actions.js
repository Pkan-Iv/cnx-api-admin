import { FetchInterface } from 'lib/interfaces'

import {
  CREDENTIALS,
  PRA
} from './descriptors'

import { api } from '../config.json'

const validStatus = [ 200, 201, 204 ]

function CreateDeleteAction (resource, success, failure) {
  return (id) => {
    const request = resource( success, failure )

    request.addPath([ id ])
    return request.delete()
  }
}

function CreateGetAction (resource, success, failure) {
  return (data) => {
    const request = resource( success, failure )

    if (data !== undefined) {
      request.setParams( data )
    }

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

function CreateRowsHandler (type) {
  return ({ count, rows }) => ({
    type,
    count,
    rows
  })
}

function CreateTypeHandler (type) {
  return () => ({
    type
  })
}

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

const Pra = FetchInterface( `${api.url}/pra`, FetchHandler ),
      Accounts = Pra( 'accounts' ),
      Acls = Pra( 'acls' ),
      All = Pra( 'all' ),
      Credentials = Pra( 'credentials' ),
      Messages = Pra( 'messages' ),
      Numbers = Pra( 'numbers' ),
      Plans = Pra( 'plans' ),
      Projects = Pra( 'projects' ),
      Roles = Pra( 'roles' )

/*
 *  DELETE
 */
export const delete_pra_accounts = CreateDeleteAction( Accounts,
  CreateTypeHandler( PRA.DELETE.ACCOUNTS.SUCCESS ),
  CreateFailureHandler( PRA.DELETE.ACCOUNTS.FAILURE )
)

export const delete_pra_all = CreateDeleteAction( All,
  CreateTypeHandler( PRA.DELETE.ALL.SUCCESS ),
  CreateFailureHandler( PRA.DELETE.ALL.FAILURE )
)

export const delete_pra_messages = CreateDeleteAction( Messages,
  CreateTypeHandler( PRA.DELETE.MESSAGES.SUCCESS ),
  CreateFailureHandler( PRA.DELETE.MESSAGES.FAILURE )
)

export const delete_pra_numbers = CreateDeleteAction( Numbers,
  CreateTypeHandler( PRA.DELETE.NUMBERS.SUCCESS ),
  CreateFailureHandler( PRA.DELETE.NUMBERS.FAILURE )
)

export const delete_pra_plans = CreateDeleteAction( Plans,
  CreateTypeHandler( PRA.DELETE.PLANS.SUCCESS ),
  CreateFailureHandler( PRA.DELETE.PLANS.FAILURE )
)

export const delete_pra_projects = CreateDeleteAction( Projects,
  CreateTypeHandler( PRA.DELETE.PROJECTS.SUCCESS ),
  CreateFailureHandler( PRA.DELETE.PROJECTS.FAILURE )
)

export const delete_pra_roles = CreateDeleteAction( Roles,
  CreateTypeHandler( PRA.DELETE.ROLES.SUCCESS ),
  CreateFailureHandler( PRA.DELETE.ROLES.FAILURE )
)

/*
 *  GET
 */
export const get_pra_accounts = CreateGetAction( Accounts,
  CreateRowsHandler( PRA.GET.ACCOUNTS.SUCCESS ),
  CreateFailureHandler( PRA.GET.ACCOUNTS.FAILURE )
)

export const get_pra_acls = CreateGetAction( Acls,
  CreateRowsHandler( PRA.GET.ACLS.SUCCESS ),
  CreateFailureHandler( PRA.GET.ACLS.FAILURE )
)

export const get_pra_all = CreateGetAction( All,
  CreateRowsHandler( PRA.GET.ALL.SUCCESS ),
  CreateFailureHandler( PRA.GET.ALL.FAILURE )
)

export const get_pra_messages = CreateGetAction( Messages,
  CreateRowsHandler( PRA.GET.MESSAGES.SUCCESS ),
  CreateFailureHandler( PRA.GET.MESSAGES.FAILURE )
)

export const get_pra_numbers = CreateGetAction( Numbers,
  CreateRowsHandler( PRA.GET.NUMBERS.SUCCESS ),
  CreateFailureHandler( PRA.GET.NUMBERS.FAILURE )
)

export const get_pra_plans = CreateGetAction( Plans,
  CreateRowsHandler( PRA.GET.PLANS.SUCCESS ),
  CreateFailureHandler( PRA.GET.PLANS.FAILURE )
)

export const get_pra_projects = CreateGetAction( Projects,
  CreateRowsHandler( PRA.GET.PROJECTS.SUCCESS ),
  CreateFailureHandler( PRA.GET.PROJECTS.FAILURE )
)

export const get_pra_roles = CreateGetAction( Roles,
  CreateRowsHandler( PRA.GET.ROLES.SUCCESS ),
  CreateFailureHandler( PRA.GET.ROLES.FAILURE )
)

/*
 *  LIST
 */
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

/*
 *  PATCH
 */
export const patch_pra_accounts = CreatePatchAction( Accounts,
  CreateTypeHandler( PRA.PATCH.ACCOUNTS.SUCCESS ),
  CreateFailureHandler( PRA.PATCH.ACCOUNTS.FAILURE )
)

export const patch_pra_all = CreatePatchAction( All,
  CreateTypeHandler( PRA.PATCH.ALL.SUCCESS ),
  CreateFailureHandler( PRA.PATCH.ALL.FAILURE )
)

export const patch_pra_messages = CreatePatchAction( Messages,
  CreateTypeHandler( PRA.PATCH.MESSAGES.SUCCESS ),
  CreateFailureHandler( PRA.PATCH.MESSAGES.FAILURE )
)

export const patch_pra_numbers = CreatePatchAction( Numbers,
  CreateTypeHandler( PRA.PATCH.NUMBERS.SUCCESS ),
  CreateFailureHandler( PRA.PATCH.NUMBERS.FAILURE )
)

export const patch_pra_plans = CreatePatchAction( Plans,
  CreateTypeHandler( PRA.PATCH.PLANS.SUCCESS ),
  CreateFailureHandler( PRA.PATCH.PLANS.FAILURE )
)

export const patch_pra_projects = CreatePatchAction( Projects,
  CreateTypeHandler( PRA.PATCH.PROJECTS.SUCCESS ),
  CreateFailureHandler( PRA.PATCH.PROJECTS.FAILURE )
)

export const patch_pra_roles = CreatePatchAction( Roles,
  CreateTypeHandler( PRA.PATCH.ROLES.SUCCESS ),
  CreateFailureHandler( PRA.PATCH.ROLES.FAILURE )
)

/*
 *  POST
 */
export const post_pra_accounts = CreatePostAction( Accounts,
  CreateTypeHandler( PRA.POST.ACCOUNTS.SUCCESS ),
  CreateFailureHandler( PRA.POST.ACCOUNTS.FAILURE )
)

export const post_pra_all = CreatePostAction( All,
  CreateTypeHandler( PRA.POST.ALL.SUCCESS ),
  CreateFailureHandler( PRA.POST.ALL.FAILURE )
)

export const post_credentials = CreatePostAction( Credentials,
  (data) => ({ type: CREDENTIALS.POST.SUCCESS, data }),
  CreateFailureHandler( CREDENTIALS.POST.FAILURE )
)

export const post_pra_messages = CreatePostAction( Messages,
  CreateTypeHandler( PRA.POST.MESSAGES.SUCCESS ),
  CreateFailureHandler( PRA.POST.MESSAGES.FAILURE )
)

export const post_pra_numbers = CreatePostAction( Numbers,
  CreateTypeHandler( PRA.POST.NUMBERS.SUCCESS ),
  CreateFailureHandler( PRA.POST.NUMBERS.FAILURE )
)

export const post_pra_plans = CreatePostAction( Plans,
  CreateTypeHandler( PRA.POST.PLANS.SUCCESS ),
  CreateFailureHandler( PRA.POST.PLANS.FAILURE )
)

export const post_pra_projects = CreatePostAction( Projects,
  CreateTypeHandler( PRA.POST.PROJECTS.SUCCESS ),
  CreateFailureHandler( PRA.POST.PROJECTS.FAILURE )
)

export const post_pra_roles = CreatePostAction( Roles,
  CreateTypeHandler( PRA.POST.ROLES.SUCCESS ),
  CreateFailureHandler( PRA.POST.ROLES.FAILURE )
)
