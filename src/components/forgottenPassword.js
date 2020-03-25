import React, { useState } from 'react'
import {
  Box,
  Button,
  Paper,
  TextField
} from '@material-ui/core'


import * as Config from '../../config.json'

import { useStyles } from './auth'


const { server } = Config,
      { HOST, PORT } = server

export function ForgottenPassword({
  createChangeHandler,
  fields = {email:''},
  forgotten = true,
  handleForgotten,
  handleRecover,
  userEmail = false
} ={}) {
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
         variant='contained'>
          SEND EMAIL
        </Button>
      </Box>
    </form>
  </Paper>)
}
