import { CreateReducer, ConnectMutator } from 'lib/factories'
import { Context } from './defaults'
import { CREDENTIALS, PRA } from './descriptors'

const CreateArrayReducer = CreateReducer( [] ),
      CreateContextReducer = CreateReducer( Context ),
      CreateNumberReducer = CreateReducer( 0 ),
      CreateObjectReducer = CreateReducer( {} ),
      CreateStringReducer = CreateReducer( '' )

export const ContextReducer = CreateContextReducer(
  ConnectMutator( (s, p) => ({ ...s, authenticated: true, ...p.data }),
    CREDENTIALS.POST.SUCCESS
  ),

  ConnectMutator( () => ({ ...Context, authenticated: false }),
    CREDENTIALS.DELETE.SUCCESS
  )
)

export const CountReducer = CreateNumberReducer(
  ConnectMutator( (s, p) => p.count,
    PRA.GET.ACCOUNTS.SUCCESS,
    PRA.GET.ACLS.SUCCESS,
    PRA.GET.ALL.SUCCESS,
    PRA.GET.MESSAGES.SUCCESS,
    PRA.GET.NUMBERS.SUCCESS,
    PRA.GET.PLANS.SUCCESS,
    PRA.GET.PROJECTS.SUCCESS,
    PRA.GET.ROLES.SUCCESS
  )
)

export const ListReducer = CreateObjectReducer(
  ConnectMutator( (s, p) => ({
    ...s, [ p.resource ]: p.rows.map(
      (row) => ({
        id: row.id,
        create: row.create,
        read: row.read,
        update: row.update,
        delete: row.delete
      }))
    }),

    PRA.LIST.ACLS.SUCCESS,
  ),

  ConnectMutator( (s, p) => ({
    ...s, [ p.resource ]: p.rows.map(
      (row) => ({
        id: row.id,
        name: row.name
      }))
    }),

    PRA.LIST.MESSAGES.SUCCESS,
    PRA.LIST.PLANS.SUCCESS,
    PRA.LIST.PROJECTS.SUCCESS,
    PRA.LIST.RESOURCES.SUCCESS,
    PRA.LIST.ROLES.SUCCESS
  ),

  ConnectMutator( (s, p) => ({
    ...s, [ p.resource ]: p.rows.map(
      (row) => ({
        id: row.id,
        name: row.label
      }))
    }),

    PRA.LIST.NUMBERS.SUCCESS
  )
)

export const ReasonReducer = CreateStringReducer(
  ConnectMutator( (s, p) => p.reason,
    PRA.DELETE.ACCOUNTS.FAILURE,
    PRA.DELETE.ALL.FAILURE,
    PRA.DELETE.MESSAGES.FAILURE,
    PRA.DELETE.NUMBERS.FAILURE,
    PRA.DELETE.PLANS.FAILURE,
    PRA.DELETE.PROJECTS.FAILURE,
    PRA.DELETE.ROLES.FAILURE,

    PRA.GET.ACCOUNTS.FAILURE,
    PRA.GET.ACLS.FAILURE,
    PRA.GET.ALL.FAILURE,
    PRA.GET.MESSAGES.FAILURE,
    PRA.GET.NUMBERS.FAILURE,
    PRA.GET.PLANS.FAILURE,
    PRA.GET.PROJECTS.FAILURE,
    PRA.GET.ROLES.FAILURE,

    PRA.LIST.ACLS.FAILURE,
    PRA.LIST.MESSAGES.FAILURE,
    PRA.LIST.NUMBERS.FAILURE,
    PRA.LIST.PLANS.FAILURE,
    PRA.LIST.PROJECTS.FAILURE,
    PRA.LIST.RESOURCES.FAILURE,
    PRA.LIST.ROLES.FAILURE,

    PRA.PATCH.ACCOUNTS.FAILURE,
    PRA.PATCH.ACLS.FAILURE,
    PRA.PATCH.ALL.FAILURE,
    PRA.PATCH.MESSAGES.FAILURE,
    PRA.PATCH.NUMBERS.FAILURE,
    PRA.PATCH.PLANS.FAILURE,
    PRA.PATCH.PROJECTS.FAILURE,
    PRA.PATCH.ROLES.FAILURE,

    PRA.POST.ACCOUNTS.FAILURE,
    PRA.POST.ALL.FAILURE,
    PRA.POST.MESSAGES.FAILURE,
    PRA.POST.NUMBERS.FAILURE,
    PRA.POST.PLANS.FAILURE,
    PRA.POST.PROJECTS.FAILURE,
    PRA.POST.ROLES.FAILURE
  ),

  ConnectMutator( (s, p) => '',
    PRA.DELETE.ACCOUNTS.SUCCESS,
    PRA.DELETE.ALL.SUCCESS,
    PRA.DELETE.MESSAGES.SUCCESS,
    PRA.DELETE.NUMBERS.SUCCESS,
    PRA.DELETE.PLANS.SUCCESS,
    PRA.DELETE.PROJECTS.SUCCESS,
    PRA.DELETE.ROLES.SUCCESS,

    PRA.GET.ACCOUNTS.SUCCESS,
    PRA.GET.ACLS.SUCCESS,
    PRA.GET.ALL.SUCCESS,
    PRA.GET.MESSAGES.SUCCESS,
    PRA.GET.NUMBERS.SUCCESS,
    PRA.GET.PLANS.SUCCESS,
    PRA.GET.PROJECTS.SUCCESS,
    PRA.GET.ROLES.SUCCESS,

    PRA.LIST.MESSAGES.SUCCESS,
    PRA.LIST.NUMBERS.SUCCESS,
    PRA.LIST.PLANS.SUCCESS,
    PRA.LIST.PROJECTS.SUCCESS,
    PRA.LIST.ROLES.SUCCESS,

    PRA.PATCH.ACCOUNTS.SUCCESS,
    PRA.PATCH.ACLS.SUCCESS,
    PRA.PATCH.ALL.SUCCESS,
    PRA.PATCH.MESSAGES.SUCCESS,
    PRA.PATCH.NUMBERS.SUCCESS,
    PRA.PATCH.PLANS.SUCCESS,
    PRA.PATCH.PROJECTS.SUCCESS,
    PRA.PATCH.ROLES.SUCCESS,

    PRA.POST.ACCOUNTS.SUCCESS,
    PRA.POST.ALL.SUCCESS,
    PRA.POST.MESSAGES.SUCCESS,
    PRA.POST.NUMBERS.SUCCESS,
    PRA.POST.PLANS.SUCCESS,
    PRA.POST.PROJECTS.SUCCESS,
    PRA.POST.ROLES.SUCCESS
  )
)

export const RowsReducer = CreateArrayReducer(
  ConnectMutator( (s, p) => p.rows,
    PRA.GET.ACCOUNTS.SUCCESS,
    PRA.GET.ACLS.SUCCESS,
    PRA.GET.ALL.SUCCESS,
    PRA.GET.MESSAGES.SUCCESS,
    PRA.GET.NUMBERS.SUCCESS,
    PRA.GET.PLANS.SUCCESS,
    PRA.GET.PROJECTS.SUCCESS,
    PRA.GET.ROLES.SUCCESS
  )
)
