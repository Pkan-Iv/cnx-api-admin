export function GetFields (fields) {
  return Object.keys( fields ).map(
    (key) => `${fields[key]} AS \`${key}\``
  ).join(', ')
}

export function GetLimit ({ _p = null, _n = null } = {}) {
  if (_p === null || _p < 0 || _n === null || _n < 0)
    return ''

  const begin = parseInt((_p - 1) * _n),
        end = begin + parseInt(_n)

  return `LIMIT ${begin}, ${end}`
}

export function GetSort ({ _s = null }, fields) {
  if (_s === null)
    return ''

  const order = _s.slice( 0, 1 ) === '-' ? 'DESC' : 'ASC',
        field = order === 'DESC' ? _s.slice( 1 ) : _s

  return `ORDER BY ${fields[field]} ${order}`
}

/*
eq      -   '='         -  (colName,eq,colValue)
ne      -   '!='        -  (colName,ne,colValue)
gt      -   '>'         -  (colName,gt,colValue)
gte     -   '>='        -  (colName,gte,colValue)
lt      -   '<'         -  (colName,lt,colValue)
lte     -   '<='        -  (colName,lte,colValue)
is      -   'is'        -  (colName,is,true/false/null)
in      -   'in'        -  (colName,in,val1,val2,val3,val4)
bw      -   'between'   -  (colName,bw,val1,val2)
like    -   'like'      -  (colName,like,~name)   note: use ~ in place of %
nlike   -   'not like'  -  (colName,nlike,~name)  note: use ~ in place of %

~or     -   'or'
~and    -   'and'
~xor    -   'xor'
*/
const replaces = {
  eq: ' = ',
  ne: ' <> ',
  gt: ' > ',
  gte: ' >= ',
  lt: ' < ',
  lte: ' <= ',
  is: ' IS ',
  in: ' IN ',
  bw: ' BETWEEN ',
  li: ' LIKE ',
  nl: ' NOT LIKE ',
  '~or': ' OR',
  '~and': ' AND ',
  '~xor': ' XOR '
}

// ((project,eq,BCA)~or(project,eq,IVMID))~and(language,eq,fr-FR)
export function GetWhere ({ _f = null } = {}) {
  console.log( _f.split( '~' ) )

  return ''
}
