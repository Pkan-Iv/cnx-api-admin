import React, { useState } from 'react'
import { Box, Button, Paper, TextField } from '@material-ui/core'
import { useStyles } from './auth'
import { post_forgotten_credentials } from '../actions'
import { useStore } from 'lib/hooks'
export function Signin() {
  const [ state, dispatch ] = useStore()
  const classes = useStyles()
  const [fields, setFields] = useState({
    username: '',
    password: ''
  })
  function createChangeHandler(field) {
    return (e) => {
      setFields({ ...fields, [field]: e.target.value })
    }
  }
  function handleForgotten(e) {
    e.preventDefault()
    // dispatch({ type: CREDENTIALS.FORGOTTEN.SUCCESS })
    dispatch(post_forgotten_credentials())
  }
  function handleSubmit(e) {
    const { password, username } = fields
    e.preventDefault()
    dispatch(post_credentials({ password, username }))
  }
  return (<Paper className={classes.paper}>
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
         onClick={handleForgotten}
         style={{ 'float': 'right' }}
         variant='contained'>
          RESET PASSWORD
        </Button>
      </Box>
    </form>
  </Paper>)
}
