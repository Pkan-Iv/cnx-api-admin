import { useState } from 'react'

export function useFormFields (initialState) {
  const [ fields, setValues ] = useState( initialState )

  function setFields (event) {
    const { id, value } = event.target
    setValues({ ...fields, [ id ]: value })
  }

  return [ fields, setFields ]
}
