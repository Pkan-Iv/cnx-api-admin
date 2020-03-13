import React, { Fragment, useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import {
  AppBar,
  Button,
  Snackbar,
  Tab,
  Tabs,
  Toolbar,
  Typography
} from '@material-ui/core'

import MuiAlert from '@material-ui/lab/Alert'

import { useDimensions, useStore } from '../../lib/hooks'

import Auth  from './auth'
import Panel from './panel'
import Panels from './panels'
import { CREDENTIALS, USER } from '../descriptors'

const useStyles = makeStyles( (theme) => ({
  grow: {
    flexGrow: 1
  },

  layout: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexGrow: 1,
    height: '100vh'
  },

  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

function GetTabProps (index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  }
}

export default function Application () {
  const classes = useStyles(),
        [ ref, dimensions ] = useDimensions(),
        [ { action, context, reason }, dispatch ] = useStore(),
        [ failure, setFailure ] = useState( false ),
        [ success, setSuccess ] = useState( false ),
        [ tab, setTab ] = useState( 0 ),
        { authenticated } = context

  function closeSnackBars () {
    setFailure( false )
    setSuccess( false )
  }

  function handleChange (e, index) {
    setTab( index )
  }

  function handleClose (event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    closeSnackBars()
  }

  function handleLogout () {
    closeSnackBars()
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

  function renderPanels () {
    return Object.keys( Panels ).map( (label, index) => (
      <Panel key={ label } value={ tab } index={ index }>
        { tab === index ? Panels[ label ]( dimensions ) : null }
      </Panel>
    ))
  }

  function renderTabs () {
    return Object.keys( Panels ).map( (label, index) => (
      <Tab key={ label } label={ label } { ...GetTabProps( index ) } />
    ))
  }

  function renderView () {
    if (!authenticated)
      return <Auth />

    return (
      <Fragment>
        <div className={ classes.layout }>
          <Tabs className={ classes.tabs } onChange={ handleChange } orientation='vertical' value={ tab } variant='scrollable'>
            { renderTabs() }
          </Tabs>

          <div ref={ ref } style={{ width: '100%' }}>
            { renderPanels() }
          </div>
        </div>

        <Snackbar autoHideDuration={ 5000 } open={ success } onClose={ handleClose }>
          <MuiAlert elevation={6} variant="filled" severity="success" onClose={ handleClose }>
            Opération réussie avec succès !
          </MuiAlert>
        </Snackbar>

        <Snackbar autoHideDuration={ 5000 } open={ failure } onClose={ handleClose }>
          <MuiAlert elevation={6} variant="filled" severity="error" onClose={ handleClose }>
            { reason }
          </MuiAlert>
        </Snackbar>
      </Fragment>
    )
  }

  useEffect( () => {
    if (reason !== '')
      return setFailure( true )

    switch (action) {
      case USER.CREATE.SUCCESS:
      case USER.DELETE.SUCCESS:
      case USER.UPDATE.SUCCESS:
        return setSuccess( true )
    }
  }, [ action, reason ])

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
