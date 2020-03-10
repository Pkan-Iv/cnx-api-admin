import { CreateReducer, ConnectMutator } from '../lib/factories'
import { Context } from './defaults'
import { CREDENTIALS, USER, USERS } from './descriptors'

const CreateArrayReducer = CreateReducer([]),
      CreateContextReducer = CreateReducer(Context),
      CreateNumberReducer = CreateReducer(0),
      CreateStringReducer = CreateReducer('')

export const ContextReducer = CreateContextReducer(
  ConnectMutator( (s, p) => ({ ...s, authenticated: true }),
    CREDENTIALS.POST.SUCCESS
  ),

  ConnectMutator( (s, p) => ({ ...s, authenticated: false }),
    CREDENTIALS.DELETE.SUCCESS
  )
)

export const CountReducer = CreateNumberReducer(
  ConnectMutator( (s, p) => p.count,
    USERS.GET.SUCCESS,
  )
)

export const ReasonReducer = CreateStringReducer(
  ConnectMutator( (s, p) => p.reason,
    USER.CREATE.FAILURE,
    USER.DELETE.FAILURE,
    USER.UPDATE.FAILURE,
    USERS.GET.FAILURE,
  )
)

export const RowsReducer = CreateArrayReducer(
  ConnectMutator( (s, p) => p.rows,
    USERS.GET.SUCCESS
  )
)
