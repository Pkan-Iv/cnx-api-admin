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
        [ token, setToken ] = useState(null)



  function handleForgotten(e) {
    e.preventDefault()
    setForgotten(!forgotten)
  }

  function handleLogout () {
    dispatch({ type: CREDENTIALS.DELETE.SUCCESS })
  }

  function handleReset() {
    const { api } = Config,
          { admin }= api

    return window.location.href(`${admin}`)
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

  const renderResetView = () => {
    const { server } = Config,
    { HOST, PORT } = server,
    url = `${HOST}:${PORT}/api/pra/reset`,
    headersConfig = {
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json',
      Accept: `*/*`
    }

    fetch(`${url}/token`, {
      headers: headersConfig,
      method: 'GET'
    })
      .then((res) => res.json())
      .then((res) => setToken(res.token))

    if (window.location.search === `?t=${token}`) {
      return (
        <ResetPassword
          handlereset={handleReset} />
      )
    }
  }

  function renderView () {
    if (!authenticated) {
      if (window.location.search.length > 0) {
        return(
          <Fragment>
            { renderResetView() }
          </Fragment>
        )
      }

      else if (!forgotten) {
        return (
        <Auth
          handleforgotten={handleForgotten}
          valueforgotten={forgotten} />
        )
      }

      else if (!userEmail && forgotten){
        return (
          <ForgottenPassword
            handleforgotten={handleForgotten}
            valueforgotten={forgotten}
            valueuseremail={userEmail} />
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
