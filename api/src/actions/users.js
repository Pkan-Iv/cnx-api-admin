import { CreateQueryHandler } from '../../lib/factories'
import { USERS } from '../descriptors'
import Queries from '../queries/users'

const users_count_failure = (reason) => ({
  type: USERS.COUNT.FAILURE,
  reason
})

const users_count_success = (rows) => ({
  type: USERS.COUNT.SUCCESS,
  count: rows[0].count
})

const users_get_failure = (reason) => ({
  type: USERS.GET.FAILURE,
  reason
})

const users_get_success = (rows) => ({
  type: USERS.GET.SUCCESS,
  rows
})

export default (pool) => {
  const handler = CreateQueryHandler( pool )

  return {
    count (options) {
      return handler( Queries.count( options ),
        users_count_success,
        users_count_failure
      )
    },

    get (options) {
      return handler( Queries.get( options ),
        users_get_success,
        users_get_failure
      )
    }
  }
}
