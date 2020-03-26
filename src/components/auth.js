import React, { useState } from 'react'

import {
  Box,
  Button,
  Paper,
  TextField
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useStore } from 'lib/hooks'

import { post_credentials } from '../actions'

// import GoogleLoginButton from './google'

export const useStyles = makeStyles(theme => ({

  paper: {
    left: '0',
    right: '0',
    width: '50%',
    height: '50%',
    margin: 'auto',
    position: 'absolute',
    padding: '16px 8px',
    top: '25%'
  },

  form: {
    height: '100%',
    width: '100%',
  },

  button: {
    bottom: '8px',
    position: 'absolute',
    left: '16px',
    right: '16px',
    }
}))


export default function Auth ({
  valueforgotten,
  handleforgotten,
} = {}) {

  const classes = useStyles(),
        [ state, dispatch ] = useStore(),
        [ fields, setFields ] = useState(
          { username: '', password: '' }
        )

  function createChangeHandler(field) {
    return (e) => {
      setFields({ ...fields, [field]: e.target.value })
    }
  }

  function handleSubmit(e) {
    const { password, username } = fields
    e.preventDefault()
    dispatch(post_credentials({ password, username }))
  }

  return (
    <Paper className={classes.paper}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          autoFocus
          fullWidth
          id='username'
          label='Username'
          margin='normal'
          name='username'
          onChange={createChangeHandler('username')}
          required variant='outlined' />

        <TextField
          fullWidth
          id='password'
          label='Password'
          margin='normal'
          name='password'
          onChange={createChangeHandler('password')}
          required autoComplete='no'
          type='password'
          variant='outlined' />

        <Box component='div' className={classes.button}>
          <Button className={classes.submit}
            color='primary'
            type='submit'
            style={{ 'float': 'left' }}
            variant='contained'>
            Sign In
          </Button>
          <Button
            color='secondary'
            onClick={handleforgotten}
            style={{ 'float': 'right' }}
            variant='contained'>
            RESET PASSWORD
          </Button>
        </Box>
      </form>
    </Paper>
  )
}



