import { GetFields, GetLimit, GetSort, GetWhere } from './utils'

const fields = {
  id: 'U.`id`',
  user: 'U.`display_name`',
  project: 'P.`name`',
  whitelabel: 'W.`name`'
}

const source = `FROM
  Users AS U
JOIN
  Projects AS P
ON
  P.id = U.project_ref
JOIN
  Whitelabels AS W
ON
  W.id = P.whitelabel_ref`

export default {
  count (options) {
    return [
      'SELECT COUNT( * ) AS count',
      source,
      GetWhere( options )
    ].join(' ')
  },

  get (options) {
    return [
      'SELECT',
      GetFields( fields ),
      source,
      GetWhere( options ),
      GetSort( options, fields ),
      GetLimit( options )
    ].join(' ')
  }
}
