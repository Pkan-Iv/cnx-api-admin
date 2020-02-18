import { CreateReducer, ConnectMutator } from '../lib/factories'
import { USERS } from './descriptors'

const ArrayReducer = CreateReducer( [] ),
      NumberReducer = CreateReducer( 0 ),
      StringReducer = CreateReducer( null )

export const CountReducer = NumberReducer(
  ConnectMutator( (s, p) => p.count,
    USERS.COUNT.SUCCESS
  )
)

export const ErrorReducer = StringReducer(
  ConnectMutator( (s, p) => p.reason,
    USERS.COUNT.FAILURE,
    USERS.GET.FAILURE
  )
)

export const RowsReducer = ArrayReducer(
  ConnectMutator( (s, p) => p.rows,
    USERS.GET.SUCCESS
  )
)
