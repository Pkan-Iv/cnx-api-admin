import React, { Fragment } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import {
  AppBar,
  Button,
  Toolbar,
  Typography
} from '@material-ui/core'

import { useStore } from '../../lib/hooks'

import Auth from './auth'
import Main from './main'

import { CREDENTIALS } from '../descriptors'

const useStyles = makeStyles( (theme) => ({
  grow: {
    flexGrow: 1
  }
}))

export default function Application () {
  const classes = useStyles(),
        [ { context }, dispatch ] = useStore(),
        { authenticated } = context

  function handleLogout () {
    dispatch({ type: CREDENTIALS.DELETE.SUCCESS })
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
    if (!authenticated)
      return <Auth />

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
