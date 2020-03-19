import React, { useState, useEffect } from 'react'

import { Checkbox, FormGroup, FormControlLabel } from '@material-ui/core'

import { useStore } from 'lib/hooks'

export default function FormCheckbox({
  dataHandler = null,
  label = '',
  onChange,
  value = ''
} = {}) {
  const [ checked, setChecked ] = useState({
    create: '',
    read: '',
    update: '',
    delete: ''
  })
  const values = dataHandler()

  function renderValues (label) {
    console.log(values)
    return values.map( (value) => (
      console.log(value.label)
      /* <Checkbox
            checked={ value.label }
            label={ label }
            onChange={ handleCheck }
          /> */
    ))
  }


  const handleCheck = (label) => {
    return (e) =>{
    setChecked({...checked, [e.target.label]: e.target.checked})
    }
  }

  if (values === undefined) {
    return null
  }

  renderValues()

  return (
    <FormGroup>
      <FormControlLabel
        />

    </FormGroup>
  )
}
