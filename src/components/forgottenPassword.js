import React, { useState } from 'react'
import {
  Box,
  Button,
  Paper,
  TextField
} from '@material-ui/core'

import { useStore } from 'lib/hooks'

import * as Config from '../../config.json'
import { CREDENTIALS } from '../descriptors'

import { useStyles } from './auth'


const { server } = Config,
      { HOST, PORT } = server

export function ForgottenPassword({ createChangeHandler, handleRecover }) {
  const classes = useStyles(),
        [ fields, setFields ] = useState({
          email: '',
        }),
        [ { context }, dispatch ] = useStore(),
        { userEmail } = context

  function createChangeHandler (field) {
    return (e) => {
      setFields({ ...fields, [ field ]: e.target.value })
    }
  }

  function handleRecover(e) {
    const { email } = fields,
          url = `${HOST}:${PORT}/api/pra/reset`,
          headersConfig = {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json',
            Accept: '*/*'
          }
    const request = { email: email}
    e.preventDefault()

    if (email !== undefined) {
      fetch( url, {
        headers: headersConfig,
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(request)
      })
      .then( (response) => response.json())
      .then( () => setEmail( !userEmail ))
      .catch( (err) => console.log('error', err))
    }

  }
  function handleForgotten () {
    dispatch({ type: CREDENTIALS.FORGOTTEN.FAILURE })
  }


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
          GO TO SIGN IN
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
