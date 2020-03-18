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
import { PRA } from '../descriptors'
import { MergeObject } from 'lib/factories'
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
        [{ action, context, reason }] = useStore(),
        [ failure, setFailure ] = useState( false ),
        [ success, setSuccess ] = useState( false ),
        [ tab, setTab ] = useState( 0 ),
        { authorizations } = context

  const acls = MergeObject( authorizations.map( (item) => ({
    [ item.resource ]: MergeObject( Object.keys( item ).filter(
      (key) => key !== 'resource'
    ).map( (key) => ({
      [ key ]: item[ key ] === 1
    })))
  })))

  const tabs = authorizations.filter(
    (item) => item.read === 1
  ).map(
    (item) => item.resource
  )

  function closeSnackBars () {
    setFailure( false )
    setSuccess( false )
  }

  function handleChange (e, index) {
    setTab( index )
  }

  function handleClose (e, reason) {
    if (reason === 'clickaway') {
      return;
    }

    closeSnackBars()
  }

  function renderPanel (label, index) {
    if (tab === index && typeof Panels[ label ] === 'function')
      return Panels[ label ]( acls, dimensions )

    return null
  }

  function renderPanels () {
    return tabs.map( (label, index) => (
      <Panel key={ label } value={ tab } index={ index }>
        { renderPanel( label, index ) }
      </Panel>
    ))
  }

  function renderTabs () {
    return tabs.map( (label, index) => (
      <Tab key={ label } label={ label } { ...GetTabProps( index ) } />
    ))
  }

  useEffect( () => {
    if (reason !== '')
      return setFailure( true )

    switch (action) {
      case PRA.DELETE.ACCOUNTS.SUCCESS:
      case PRA.PATCH.ACCOUNTS.SUCCESS:
      case PRA.POST.ACCOUNTS.SUCCESS:

      case PRA.DELETE.ALL.SUCCESS:
      case PRA.PATCH.ALL.SUCCESS:
      case PRA.POST.ALL.SUCCESS:

      case PRA.DELETE.MESSAGES.SUCCESS:
      case PRA.PATCH.MESSAGES.SUCCESS:
      case PRA.POST.MESSAGES.SUCCESS:

      case PRA.DELETE.NUMBERS.SUCCESS:
      case PRA.PATCH.NUMBERS.SUCCESS:
      case PRA.POST.NUMBERS.SUCCESS:

      case PRA.DELETE.PLANS.SUCCESS:
      case PRA.PATCH.PLANS.SUCCESS:
      case PRA.POST.PLANS.SUCCESS:

      case PRA.DELETE.PROJECTS.SUCCESS:
      case PRA.PATCH.PROJECTS.SUCCESS:
      case PRA.POST.PROJECTS.SUCCESS:

      case PRA.DELETE.ROLES.SUCCESS:
      case PRA.PATCH.ROLES.SUCCESS:
      case PRA.POST.ROLES.SUCCESS:
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
