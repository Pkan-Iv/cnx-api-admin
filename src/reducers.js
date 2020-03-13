import { CreateReducer, ConnectMutator } from '../lib/factories'
import { Context } from './defaults'

import {
  CREDENTIALS,
  LANGUAGES,
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
    USERS.GET.SUCCESS
  )
)

export const ListReducer = CreateObjectReducer(
  ConnectMutator( (s, p) => ({ ...s, [ p.resource ]: p.rows }),
    LANGUAGES.GET.SUCCESS,
    PROJECTS.GET.SUCCESS,
    TYPES.GET.SUCCESS
  )
)

export const ReasonReducer = CreateStringReducer(
  ConnectMutator( (s, p) => p.reason,
    LANGUAGES.GET.FAILURE,
    PROJECTS.GET.FAILURE,
    TYPES.GET.FAILURE,
    USER.CREATE.FAILURE,
    USER.DELETE.FAILURE,
    USER.UPDATE.FAILURE,
    USERS.GET.FAILURE
  )
)

export const RowsReducer = CreateArrayReducer(
  ConnectMutator( (s, p) => p.rows,
    USERS.GET.SUCCESS
  )
)
