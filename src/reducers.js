import { CreateReducer, ConnectMutator } from '../lib/factories'
import { Context } from './defaults'
import { CREDENTIALS, PROJECTS, USERS, WHITELABELS } from './descriptors'

const CreateArrayReducer = CreateReducer([]),
  CreateContextReducer = CreateReducer(Context),
  CreateNumberReducer = CreateReducer(0),
  CreateObjectReducer = CreateReducer({}),
  CreateStringReducer = CreateReducer('')

export const ContextReducer = CreateContextReducer(
  ConnectMutator((s, p) => ({ ...s, authenticated: true }),
    CREDENTIALS.POST.SUCCESS
  ),

  ConnectMutator((s, p) => ({ ...s, authenticated: false }),
    CREDENTIALS.DELETE.SUCCESS
  )
)

export const CountReducer = CreateNumberReducer(
  ConnectMutator((s, p) => p.count,
    PROJECTS.GET.ALL.SUCCESS,
    USERS.GET.ALL.SUCCESS,
    WHITELABELS.GET.ALL.SUCCESS,
  )
)

export const ReasonReducer = CreateStringReducer(
  ConnectMutator((s, p) => p.reason,
    PROJECTS.GET.ALL.FAILURE,
    USERS.CREATE.FAILURE,
    USERS.DELETE.ONE.FAILURE,
    USERS.GET.ALL.FAILURE,
    USERS.GET.ONE.FAILURE,
    USERS.UPDATE.ONE.FAILURE,
    WHITELABELS.GET.ALL.FAILURE
  )
)

export const RowReducer = CreateObjectReducer(
  ConnectMutator((s, p) => p.row,
    USERS.CREATE.SUCCESS,
    USERS.DELETE.ONE.SUCCESS,
    USERS.GET.ONE.SUCCESS,
    USERS.UPDATE.ONE.SUCCESS,
  )
)

export const RowsReducer = CreateArrayReducer(
  ConnectMutator((s, p) => p.rows,
    PROJECTS.GET.ALL.SUCCESS,
    USERS.GET.ALL.SUCCESS,
    WHITELABELS.GET.ALL.SUCCESS,
  )
)
