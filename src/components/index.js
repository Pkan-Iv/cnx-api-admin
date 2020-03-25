import React, { Fragment, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import {
  AppBar,
  Button,
  Toolbar,
  Typography
} from '@material-ui/core'
import * as Config from '../../config.json'

import { useStore } from 'lib/hooks'

import Auth from './auth'
import ForgottenPassword from './forgottenPassword'
import Main from './main'

import { CREDENTIALS } from '../descriptors'
import { ResetPassword } from './reset'

const useStyles = makeStyles( (theme) => ({
  grow: {
    flexGrow: 1
  }
}))

export default function Application () {
  const classes = useStyles(),
        [ { context }, dispatch ] = useStore(),
        { authenticated } = context,
        [ forgotten, setForgotten ] = useState(false),
        [ userEmail, setEmail ] = useState(false),
        token = null

  function createChangeHandler(field) {
    return (e) => {
      setFields({ ...fields, [field]: e.target.value })
    }
  }

  function handleForgotten(e) {
    e.preventDefault()
    setForgotten(!forgotten)
  }

  function handleLogout () {
    dispatch({ type: CREDENTIALS.DELETE.SUCCESS })
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
          data = {
            headers: headersConfig,
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(request)
          },
          request = { email: email}

    console.log(data)
    console.log(url)
    if (email !== undefined) {
      fetch( url, data)
      .then( (response) => response.json())
      .then( (result) => console.log(result) )
      .then( () => setEmail( !userEmail ))
      .catch( (err) => console.log('error', err))
    }
  }

  function handleReset() {
    setEmail( !userEmail )
  }

  function handleSubmit(e) {
    const { password, username } = fields
    e.preventDefault()
    dispatch(post_credentials({ password, username }))
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

  function renderLogout () {
    if (!authenticated)
      return null

    return (
      <Button color='inherit' onClick={ handleLogout }>
        Logout
      </Button>
    )
  }

  function renderView () {
    if (!authenticated) {
      if (!forgotten) {
        console.log(`Forgotten: ${forgotten}
        User email: ${userEmail}`)
      return (
        <Auth
          createChangeHandler={createChangeHandler}
          handleForgotten={handleForgotten}
          handleSubmit={handleSubmit} />
        )
      } else if (!userEmail && forgotten) {
        console.log(`Forgotten: ${forgotten}
        User email: ${userEmail}`)
        return (
          <ForgottenPassword
            createChangeHandler={createChangeHandler}
            handleForgotten={handleForgotten}
            handleRecover={handleRecover} />
        )
      } else if (token !== null) {
        return (
          <ResetPassword
            createChangeHandler={createChangeHandler}
            handleReset={handleReset}
            handleSubmitReset={handleSubmitReset}/>
        )
      }
    }
    return <Main />
  }

  return (
    <Fragment>
      <AppBar position='relative' color='default'>
        <Toolbar className={ classes.grow }>
          <Typography  className={ classes.grow } variant='h6' color='inherit' noWrap>
            Connectics API Admin
          </Typography>

          { renderLogout() }
        </Toolbar>
      </AppBar>

      { renderView() }
    </Fragment>
  )
}
