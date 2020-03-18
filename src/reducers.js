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
    PRA.GET.ALL.SUCCESS,
    PRA.GET.MESSAGES.SUCCESS,
    PRA.GET.NUMBERS.SUCCESS,
    PRA.GET.PLANS.SUCCESS,
    PRA.GET.PROJECTS.SUCCESS
  )
)

export const ListReducer = CreateObjectReducer(
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
    PRA.GET.ACCOUNTS.FAILURE,
    PRA.GET.ALL.FAILURE,
    PRA.GET.MESSAGES.FAILURE,
    PRA.GET.NUMBERS.FAILURE,
    PRA.GET.PLANS.FAILURE,
    PRA.GET.PROJECTS.FAILURE,
    PRA.LIST.MESSAGES.FAILURE,
    PRA.LIST.NUMBERS.FAILURE,
    PRA.LIST.PLANS.FAILURE,
    PRA.LIST.PROJECTS.FAILURE,
    PRA.LIST.ROLES.FAILURE,
    PRA.PATCH.ACCOUNTS.FAILURE,
    PRA.POST.ACCOUNTS.FAILURE
  )
)

export const RowsReducer = CreateArrayReducer(
  ConnectMutator( (s, p) => p.rows,
    PRA.GET.ACCOUNTS.SUCCESS,
    PRA.GET.ALL.SUCCESS,
    PRA.GET.MESSAGES.SUCCESS,
    PRA.GET.NUMBERS.SUCCESS,
    PRA.GET.PLANS.SUCCESS,
    PRA.GET.PROJECTS.SUCCESS
  )
)
