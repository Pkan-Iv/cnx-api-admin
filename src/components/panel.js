import React from 'react'
import PropTypes from 'prop-types'

import { Container, Grid, } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( (theme) => ({
  panel: {
    flexGrow: 1,
    height: '100vh',
    margin: 0,
    width: 'auto'
  }
}))

export default function Panel (props) {
  const { children, value, index } = props,
        classes = useStyles()

  if (value !== index)
    return null

  return (
    <Container className={ classes.panel } fixed
      role='tabpanel'
      id={ `vertical-tabpanel-${index}` }
      aria-labelledby={ `vertical-tab-${index}` }>
      <Grid container spacing={ 0 }>
        { children }
      </Grid>
    </Container>
  )
}

Panel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}