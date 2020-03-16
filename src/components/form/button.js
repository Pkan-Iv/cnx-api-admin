import React from 'react'

import { Button } from '@material-ui/core'

export default function FormButton ({
  children = null,
  click = () => null,
  color = 'primary',
  icon = null,
  type = 'button'
} = {}) {
  const props = {
    color,
    onClick: click,
    startIcon: icon,
    style: {
      float: type === 'submit' ? 'right' : 'left'
    },
    type,
    variant: 'contained'
  }

  return (
    <Button { ... props }>
      { children }
    </Button>
  )
}
