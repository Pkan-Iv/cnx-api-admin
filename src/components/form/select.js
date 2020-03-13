import React from 'react'

import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( (theme) => ({
  input: {
    margin: '5 auto',
    width: '60%'
  }
}))

export default function FormSelect ({
  dataHandler = null,
  label = '',
  multiple = false,
  onChange,
  value = ''
} = {}) {
  const classes = useStyles(),
        values = dataHandler()

  function renderValues () {
    return values.map( ({ id, name }) => (
      <MenuItem key={ id } value={ id }>
        { name }
      </MenuItem>
    ))
  }

  if (values === undefined) {
    return null
  }

  return (
    <TextField className={ classes.input }
      id={ label.toLowerCase() }
      label={ label }
      margin='normal'
      onChange={ onChange }
      select
      value={ value }
      variant='outlined'>
      { renderValues() }
    </TextField>
  )
}
