import React, { useState } from 'react'
import {
  Box,
  Button,
  Paper,
  TextField
} from '@material-ui/core'

import * as Config from '../../config.json'

import { useStyles } from './auth'

export default function ForgottenPassword({
  handleforgotten,
  valueforgotten,
  valueuseremail,
} = {}) {
  const classes = useStyles(),
  [ fields, setFields ] = useState({ email: '' })

  function createChangeHandler(field) {
    return (e) => {
      setFields({ ...fields, [field]: e.target.value })
    }
  }
  function handleRecover() {
    const { server } = Config,
      { HOST, PORT } = server,
      { email } = fields,
          url = `${HOST}:${PORT}/api/pra/reset`,
          headersConfig = {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json',
            Accept: `*/*`
          },
          request = { email: email },
          data = {
            headers: headersConfig,
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(request)
          }

    if (email !== undefined) {
      fetch( url, data)
      .then( (response) => response.json())
      .then( (result) => console.log(result) )
      .catch( (err) => console.log('error', err))
    }
  }

  return (
    <Paper className={classes.paper}>
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
            onClick={handleforgotten}
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
    </Paper>
  )
}


