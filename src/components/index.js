import React, { Fragment, useState, useEffect } from 'react'

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


  function getToken() {
    const { server } = Config,
    { HOST, PORT } = server,
    url = `${HOST}:${PORT}/api/pra/reset`,
    headersConfig = {
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json',
      Accept: `*/*`
    }
    return fetch(`${url}/token`, {
      headers: headersConfig,
      method: 'GET'
    })
      .then((res) => res.json())
      .then((result) => result.token)
  }

  function handleForgotten(e) {
    e.preventDefault()
    setForgotten(!forgotten)
    console.log('handleForgotten OK')
  }

  function handleLogout () {
    dispatch({ type: CREDENTIALS.DELETE.SUCCESS })
  }

  function handleReset() {
    setEmail( !userEmail )
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
      if (window.location.search.length > 0) {
        console.log('OK')
          return (
            <ResetPassword
              handlereset={handleReset} />
          )
        // console.log(forgotten)
        // console.log(userEmail)
        /*if (forgotten && userEmail) {
        } setToken(getToken())
        if (token !== null && window.location.search === `?t=${token}`) {
          console.log('Token:', token)
          console.log('Window param:', window.location.search)
          console.log('display:', window.location.search === `?t=${token}`)


        } */
      }

      else if (!forgotten) {
        console.log('Auth')
        console.log('Forgotten: ', forgotten)
        return (
        <Auth
          handleforgotten={handleForgotten}
          valueforgotten={forgotten} />
        )
      }
      else if (!userEmail && forgotten){
        console.log('Forgotten Password')
        console.log('Forgotten: ', forgotten)
        console.log('User Email: ', userEmail)
        return (
          <ForgottenPassword
            handleforgotten={handleForgotten}
            valueforgotten={forgotten}
            valueuseremail={userEmail} />
        )
      }}
    return <Main />
  }

  console.log(window.location.search.length > 0)
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
