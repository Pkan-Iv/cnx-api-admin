import React, { useState, useEffect } from 'react'

import { Checkbox, FormGroup, FormControlLabel } from '@material-ui/core'

import { useStore } from 'lib/hooks'

export default function FormCheckbox({
  dataHandler = null,
  label = '',
  onChange,
  value = ''
} = {}) {
  const [ state, dispatch ] = useStore(),
        { rows } = state
  // const values = dataHandler()

  function renderValues () {
    return values.map( (value) => console.log(value) )
  }


  const handleCheck = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked})
  }

  // if (values === undefined) {
  //   return null
  // }
  useEffect( () => {
    // console.log(data)
    // renderValues()
  })

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={ state.label }
            label={ label }
            onChange={ handleCheck }
          />
        }
        />

    </FormGroup>
  )
}
