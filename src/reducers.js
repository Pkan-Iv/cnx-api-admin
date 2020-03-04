import { CreateReducer, ConnectMutator } from '../lib/factories'
import { Context } from './defaults'
import { USERS } from './descriptors'

const CreateArrayReducer = CreateReducer( [] ),
      CreateContextReducer = CreateReducer( Context ),
      CreateNumberReducer = CreateReducer( 0 ),
      CreateObjectReducer = CreateReducer( {} ),
      CreateStringReducer = CreateReducer( '' )

export const ContextReducer = CreateContextReducer(
  // TODO
)

export const CountReducer = CreateNumberReducer(
  ConnectMutator( (s, p) => p.count,
    USERS.GET.ALL.SUCCESS
  )
)

export const ReasonReducer = CreateStringReducer(
  ConnectMutator( (s, p) => p.reason,
    USERS.GET.ALL.FAILURE,
    USERS.GET.ONE.FAILURE
  )
)

export const RowReducer = CreateObjectReducer(
  ConnectMutator( (s, p) => p.row,
    USERS.GET.ONE.SUCCESS
  )
)

export const RowsReducer = CreateArrayReducer(
  ConnectMutator( (s, p) => p.rows,
    USERS.GET.ALL.SUCCESS
  )
)
