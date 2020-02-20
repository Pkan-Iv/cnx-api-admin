import { useState, useEffect } from 'react'
import { useDataProvider } from 'react-admin'

export function useDataLoader ({
  field = 'name',
  mapper = (row) => ({ id: row.id, name: row.name }),
  resource = null
} = {}) {
  const dataProvider = useDataProvider()
  const [ error, setError ] = useState( null )
  const [ loading, setLoading ] = useState( true )
  const [ values, setValues ] = useState([])

  useEffect( () => {
    if (loading && resource) {
      dataProvider.getList( resource, {
        filter: {},
        pagination: {
          page:1,
          perPage: 100
        },
        sort: {
          field,
          order: 'ASC'
        }
      }).then( (response) => {
        const { data } = response

        setLoading( false )
        setValues( data.map( mapper ))
      }).catch( (error) => {
        setError( error )
        setLoading( false )
      })
    }
  }, [])

  return [ error, loading, values ]
}
