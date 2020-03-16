import React, { useEffect, useState, Fragment } from 'react'
import { Button } from '@material-ui/core'

import { Context } from '../defaults'

import * as Config from '../../config.json'

const GoogleLoginButton = (props) => {
  const /* [state, dispatch] = useState(), */
        [ authenticated, setAuthenticated ] = useState({
    authenticated : false
  }),
        toggleLoggedIn = () => {
    setAuthenticated(!authenticated)
    return { ...Context, authenticated: authenticated}
  }

  const onSignIn = (googleUser) => {

    toggleLoggedIn()
    let user = googleUser.getBasicProfile()
    let id_token = googleUser.getAuthResponse().id_token
    console.log('google user obj', user)
    console.log('google_id_token', id_token)
  }

  const renderGoogleLoginButton = () => {
    const { google } = Config
    console.log('rendering google signin button')
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: google.client_id
      })
      .then( () => {
        window.gapi.signin2.render('my-signin2', {
          scope: 'profile email',
          width: 250,
          height: 40,
          longtitle: true,
          theme: 'light',
          onsuccess: onSignIn
        })
      })
    })
  }

  const logout = () => {
    console.log('in logout')
    let auth2 = window.gapi && window.gapi.auth2.getAuthInstance()

    if (auth2) {
      auth2.signOut().then(() => {
        toggleLoggedIn()
        console.log('Logged out successfully')
      }).catch(err => {
        console.log('Error while logging out', err)
      })
    } else {
      console.log('error while logging out')
    }
  }

  useEffect(() => {
    window.addEventListener('google-loaded', renderGoogleLoginButton)
    window.gapi && renderGoogleLoginButton()
  }, [])

  return (
    <Fragment>
      <Button id="my-signin2" style={{
        display: 'flex',
        margin: '0 auto'
      }} ></Button>
      <br />
      { authenticated && <Button style={{
        display: 'flex',
        margin: '0 auto',
        width: 200,
        height: 40,
        textAlign: 'center'
      }} onClick={logout}>
      Logout
      </Button>}
    </Fragment>
      )
}

export default GoogleLoginButton