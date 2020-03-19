import React from 'react'

import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'

export default function FormCheckbox({
  checked = false,
  label = '',
  onChange
} = {}) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox checked={ checked }
            onChange={ onChange }
            value='primary'
            inputProps={{ 'aria-label': 'primary checkbox' }} />
        }
        label= { label } />
    </FormGroup>
  )
}
