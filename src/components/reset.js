import React from 'react'

import {
  Box,
  Button,
  Paper,
  TextField
} from '@material-ui/core'

import { patch_credentials } from '../actions'

import { useStyles } from './auth'

export function ResetPassword({ createChangeHandler, handleReset, handleSubmitReset }) {
  const classes = useStyles(),
        [ fields, setFields ] = useState({
          email: '',
          password: '',
          password2: ''
        }),
        [ forgotten, setForgotten ] = useState( false ),
        [ userEmail, setEmail ] = useState( false ),
        [ state, dispatch ] = useStore()

  function createChangeHandler (field) {
    return (e) => {
      setFields({ ...fields, [ field ]: e.target.value })
    }
  }

  function handleReset() {
    setEmail( !userEmail )
  }

  function handleSubmitReset (e) {
    const { email ,password } = fields

    e.preventDefault()
    confirmPassword()
    ? dispatch(patch_credentials({ email ,password }))
    : console.log('Try again')

    setForgotten(false)
    setEmail(false)
  }

  return (
    <Paper className={classes.paper}>
      <form className={classes.form} onSubmit={handleSubmitReset}>
        <TextField
          autoFocus
          fullWidth
          id='email'
          label='Email'
          margin='normal'
          name='email'
          onChange={createChangeHandler('email')}
          required variant='outlined' />

        <TextField
          fullWidth
          id='password'
          label='Password'
          margin='normal'
          name='password'
          onChange={createChangeHandler('password')}
          required autoComplete='no' type='password'
          variant='outlined' />

        <TextField
          fullWidth
          id='password2'
          label='Password2'
          margin='normal'
          name='password2'
          onChange={createChangeHandler('password2')}
          required
          autoComplete='no'
          type='password'
          variant='outlined' />

        <Box component='div' className={classes.button}>
          <Button
            color='primary'
            type='submit'
            style={{ 'float': 'left' }}
            variant='contained'>
            RESET
          </Button>
          <Button
            color='secondary'
            onClick={handleReset}
            style={{ 'float': 'right' }}
            variant='contained'>
            CANCEL
          </Button>
        </Box>
      </form>
    </Paper>
  )
}
