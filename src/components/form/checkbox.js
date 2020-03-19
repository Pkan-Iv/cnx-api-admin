import React from 'react'

import { Checkbox } from '@material-ui/core'

export default function FormCheckbox({
  checked = false,
  label = '',
  onChange
} = {}) {
  return (
    <Checkbox checked={ checked }
      onChange={ onChange }
      value='primary'
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  )
}
