import React, { Fragment, useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import {
  Snackbar,
  Tab,
  Tabs
} from '@material-ui/core'

import MuiAlert from '@material-ui/lab/Alert'

import Panel from './panel'
import Panels from './panels'
import { USER } from '../descriptors'
import { useDimensions, useStore } from 'lib/hooks'

const useStyles = makeStyles( (theme) => ({
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
        [{ action, reason }] = useStore(),
        [ failure, setFailure ] = useState( false ),
        [ success, setSuccess ] = useState( false ),
        [ tab, setTab ] = useState( 0 )

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
