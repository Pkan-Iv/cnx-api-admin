import React from 'react'

import { Button } from '@material-ui/core'

export default function FormButton ({
  children = null,
  click = () => null,
  color = 'primary',
  icon = null,
  type = 'button'
} = {}) {
  const classes = useStyles()

  const props = {
    className: classes.submit,
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
