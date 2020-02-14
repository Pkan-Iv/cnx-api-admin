import { useState, useEffect } from 'react'
import { useDataProvider } from 'react-admin'

export function useDataLoader ({
  field = 'name',
  mapper = (row) => ({ id: row.id, name: row.name }),
  resource = null
} = {}) {
  const dataProvider = useDataProvider()
  const [ count, setCount ] = useState( null )
  const [ error, setError ] = useState( null )
  const [ loading, setLoading ] = useState( true )
  const [ page, setPage ] = useState( 1 )
  const [ values, setValues ] = useState([])

  useEffect( () => {
    if (values.length !== 0 && count !== null) {
      if (count === values.length) {
        setLoading( false )
      }
    }
  }, [ count, values ])

  useEffect( () => {
    if (loading && resource) {
      dataProvider.getList( resource, {
        filter: {},
        pagination: {
          page,
          perPage: 100
        },
        sort: {
          field,
          order: 'ASC'
        }
      }).then( (response) => {
        const { data, total } = response

        if (count === null) {
          setCount( total )
        }

        setPage( page + 1)
        setValues([ ...values, ...data.map( mapper ) ])
      }).catch( (error) => {
        setError( error )
        setLoading( false )
      })
    }
  }, [ values ])

  return [ error, loading, values ]
}
