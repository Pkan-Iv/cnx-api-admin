import { CreateReducer, ConnectMutator } from '../lib/factories'
import { USERS } from './descriptors'

const ArrayReducer = CreateReducer( [] ),
      NumberReducer = CreateReducer( 0 ),
      ObjectReducer = CreateReducer( {} ),
      StringReducer = CreateReducer( '' )

export const CountReducer = NumberReducer(
  ConnectMutator( (s, p) => p.count,
    USERS.GET.ALL.SUCCESS
  )
)

export const ReasonReducer = StringReducer(
  ConnectMutator( (s, p) => p.reason,
    USERS.GET.ALL.FAILURE,
    USERS.GET.ONE.FAILURE
  )
)

export const RowReducer = ObjectReducer(
  ConnectMutator( (s, p) => p.rows[0],
    USERS.GET.ONE.SUCCESS
  )
)

export const RowsReducer = ArrayReducer(
  ConnectMutator( (s, p) => p.rows,
    USERS.GET.ALL.SUCCESS
  )
)
