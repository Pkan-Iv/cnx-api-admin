import React, { Fragment } from 'react'

import { Box, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  input: {
    margin: '5 auto',
    width: '60%'
  }
}))

export const Add = () => {
  const classes = useStyles()

  return (
    <Fragment>
      <Box>
        <h3>Add a new user</h3>
      </Box>
      <form
        autoComplete='off'
        noValidate
      >
        <Box component='span' display='block' height='100%' >
          <TextField className={classes.input} id='username' label='Username' variant='outlined' margin='normal' />
          <TextField className={classes.input} id='login' label='Login' variant='outlined' margin='normal' />
          <TextField className={classes.input} id='type' label='Type' variant='outlined' margin='normal' />
          <TextField className={classes.input} id='language' label='Language' variant='outlined' margin='normal' />
          <TextField className={classes.input} id='project' label='Project' variant='outlined' margin='normal' />
          <TextField className={classes.input} id='whitelabel' label='Whitelabel' variant='outlined' margin='normal' />
        </Box>
      </form>
    </Fragment >
  )
}

export const Edit = ({ id }) => {
  const classes = useStyles()

  return (
    <Fragment>
      <Box>
        <h3>Edit user { id } </h3>
      </Box>
      <form
        autoComplete='off'
        noValidate
      >
        <Box component='span' display='block' height='100%' >
          <TextField className={classes.input} id='username' label='Username' variant='outlined' margin='normal' />
          <TextField className={classes.input} id='login' label='Login' variant='outlined' margin='normal' />
          <TextField className={classes.input} id='type' label='Type' variant='outlined' margin='normal' />
          <TextField className={classes.input} id='language' label='Language' variant='outlined' margin='normal' />
          <TextField className={classes.input} id='project' label='Project' variant='outlined' margin='normal' />
          <TextField className={classes.input} id='whitelabel' label='Whitelabel' variant='outlined' margin='normal' />
        </Box>
      </form>
    </Fragment >
  )
}
