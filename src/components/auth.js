import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import {
  Box,
  Button,
  Paper,
  TextField
} from '@material-ui/core'


import { post_credentials } from '../actions'
import { Context } from '../defaults'
import { useStore } from 'lib/hooks'
import GoogleLoginButton from './GoogleLoginButton'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },

  paper: {
    margin: '0 auto',
    padding: theme.spacing(2),

    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    },
    width: '50%'
  },

  submit: {
    display: 'flex',
    margin: '0 auto'
  }
}))

export default function Auth () {
  const classes = useStyles(),
        [ fields, setFields ] = useState({
          username: '',
          password: ''
        }),
        [ state, dispatch ] = useStore()

  function createChangeHandler (field) {
    return (e) => {
      setFields({ ...fields, [ field ]: e.target.value })
    }
  }

  function handleSubmit (e) {
    const { password, username } = fields

    e.preventDefault()
    dispatch(post_credentials({ password, username }))
  }


  return (
    <Paper className={ classes.paper }>
      <form className={ classes.form } onSubmit={ handleSubmit }>
        <TextField
          autoFocus
          fullWidth
          id="username"
          label="Username"
          margin="normal"
          name="username"
          onChange={ createChangeHandler('username') }
          required
          variant="outlined"
        />

        <TextField
          fullWidth
          id="password"
          label="Password"
          margin="normal"
          name="password"
          onChange={ createChangeHandler('password') }
          required
          autoComplete='no'
          type="password"
          variant="outlined"
        />

        <Box display="block" justifyContent="center">
          <Button
            className={ classes.submit }
            color="primary"
            type="submit"
            variant="contained">
            Sign In
          </Button>
          <GoogleLoginButton className={ classes.submit } type='submit'/>
        </Box>
      </form>
    </Paper>
  )
}
