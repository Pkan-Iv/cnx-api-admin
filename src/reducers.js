import { CreateReducer, ConnectMutator } from 'lib/factories'
import { Context } from './defaults'

import {
  CREDENTIALS,
  LANGUAGES,
  PRA,
  PROJECTS,
  TYPES,
  USER,
  USERS
} from './descriptors'

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
  /*
  ConnectMutator( (s, p) => ({ ...s, [ p.resource ]: p.rows }),
    LANGUAGES.GET.SUCCESS,
    PROJECTS.GET.SUCCESS,
    TYPES.GET.SUCCESS
  )
  */
)

export const ReasonReducer = CreateStringReducer(
  ConnectMutator( (s, p) => p.reason,
    PRA.GET.ACCOUNTS.FAILURE,
    PRA.GET.ALL.FAILURE,
    PRA.GET.MESSAGES.FAILURE,
    PRA.GET.NUMBERS.FAILURE,
    PRA.GET.PLANS.FAILURE,
    PRA.GET.PROJECTS.FAILURE
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