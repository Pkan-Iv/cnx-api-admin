import React from 'react'
import {
  Box,
  Button,
  Paper,
  TextField
} from '@material-ui/core'

import { useStyles } from './auth'

export default function ForgottenPassword({
  createChangeHandler,
  fields = {email:''},
  forgotten = true,
  handleForgotten,
  handleRecover,
  userEmail = false
} = {}) {
  const classes = useStyles()

  return (<Paper className={classes.paper}>
    <form className={classes.form}>
      <TextField
        autoFocus
        fullWidth
        id='email'
        label='Email'
        margin='normal'
        name='email'
        onChange={createChangeHandler('email')}
        required
        variant='outlined' />

      <Box component='div' className={classes.button}>
        <Button className={classes.submit}
          color='secondary'
          onClick={handleForgotten}
          style={{ 'float': 'left' }}
          variant='contained'>
          SIGN IN
        </Button>
        <Button
         color='primary'
         onClick={handleRecover}
         style={{ 'float': 'right' }}
         type='reset'
         variant='contained'>
          SEND EMAIL
        </Button>
      </Box>
    </form>
  </Paper>)
}
