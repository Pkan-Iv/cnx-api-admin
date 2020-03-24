import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import {
  Box,
  Button,
  Paper,
  TextField
} from '@material-ui/core'

import { patch_credentials, post_credentials } from '../actions'
import { useStore } from 'lib/hooks'
// import GoogleLoginButton from './google'

import * as Config from '../../config.json'
import fetch from 'cross-fetch'

const { server } = Config,
      { HOST, PORT } = server

const useStyles = makeStyles(theme => ({

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


export default function Auth () {
  const [ fields, setFields ] = useState({
          username: '',
          password: ''
        } ||
        { username: '',
          password: '',
          password2: ''
        }||
        { email: ''
        }),
        [ forgotten, setForgotten ] = useState( false ),
        [ userEmail, setEmail ] = useState( false ),
        [ state, dispatch ] = useStore()

  function confirmPassword () {
    const { password, password2, username } = fields
    return (password.length > 0 && password === password2) ? 1 : 0
  }

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

  function handleReset() {
    setEmail( !userEmail )
  }

  function handleSubmit (e) {
    const { password, username } = fields

    e.preventDefault()
    dispatch(post_credentials({ password, username }))
  }

  function handleSubmitReset (e) {
    const { password, username } = fields

    e.preventDefault()
    confirmPassword()
    ? dispatch(patch_credentials({ password, username }))
    : console.log('Try again')

    setForgotten(false)
    setEmail(false)
  }

  function handleForgotten () {
    setForgotten(!forgotten)
  }

  console.log(userEmail, forgotten)
  return (
    ( !userEmail && !forgotten)
    ? (<Signin
        handleSubmit={handleSubmit}
        createChangeHandler={createChangeHandler}
        handleForgotten={handleForgotten} />)
    : ( !userEmail && forgotten )
    ? <RecoverPassword
        createChangeHandler={createChangeHandler}
        handleForgotten={handleForgotten}
        handleRecover={handleRecover} />
    : (<UpdatePassword
        createChangeHandler={createChangeHandler}
        handleReset={handleReset}
        handleSubmitReset={handleSubmitReset} />)
  )
}

function RecoverPassword({ createChangeHandler, handleForgotten,handleRecover}) {
  const classes = useStyles()
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
          required variant='outlined' />

        <Box component='div' className={classes.button}>
          <Button className={classes.submit}
            color='secondary'
            onClick={handleForgotten}
            style={{'float': 'left'}}
            variant='contained'>
            GO TO SIGN IN
          </Button>
          <Button color='primary'
            onClick={handleRecover}
            style={{'float': 'right'}} variant='contained'>
            SEND EMAIL
          </Button>
        </Box>
      </form>
    </Paper>
  )
}

function Signin({handleSubmit, createChangeHandler, handleForgotten}) {
  const classes = useStyles()
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
            style={{'float': 'left'}}
            variant='contained'>
            Sign In
          </Button>
          <Button color='secondary'
            onClick={handleForgotten}
            style={{'float': 'right'}} variant='contained'>
            RESET PASSWORD
          </Button>

          { /*<GoogleLoginButton className={ classes.submit } type='submit'/>*/ }
        </Box>
      </form>
    </Paper>
  )
}

function UpdatePassword({handleSubmitReset, createChangeHandler, handleReset}) {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <form className={classes.form} onSubmit={handleSubmitReset}>
        <TextField
          autoFocus
          fullWidth
          id='username'
          label='Username'
          margin='normal'
          name='username'
          onChange={createChangeHandler('username')}
          required
          variant='outlined' />

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
        <TextField
          fullWidth
          id='password2'
          label='Password2'
          margin='normal'
          name='password2'
          onChange={createChangeHandler('password2')}
          required autoComplete='no'
          type='password'
          variant='outlined' />

        <Box component='div' className={classes.button}>
          <Button
            color='primary'
            type='submit'
            style={{'float': 'left'}}
            variant='contained'>
            RESET
          </Button>
          <Button
            color='secondary'
            onClick={handleReset}
            style={{'float': 'right'}}
            variant='contained'>
            CANCEL
          </Button>
        </Box>
      </form>
    </Paper>
  )
}
