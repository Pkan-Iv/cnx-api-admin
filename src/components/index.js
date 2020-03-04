import React, { Fragment, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography
} from '@material-ui/core'

import { useStore } from '../../lib/hooks'

import Auth  from './auth'
import Panel from './panel'
import Views from './views'

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
        [ { context }, dispatch ] = useStore(),
        [ tab, setTab ] = useState( 0 ),
        [ view, setView ] = useState({ type: 'list' }),
        { authenticated } = context

  function handleChange (e, index) {
    setTab( index )
    setView({ type: 'list' })
  }

  function handleCreate () {
    setView({ type: 'add' })
  }

  function handleSelect (id) {
    setView({ type: 'edit', id })
  }

  function renderPanel (label) {
    const { id, type } = view

    return Views[ label ][ type ]({
      create: handleCreate,
      select: handleSelect,
      id
    })
  }

  function renderPanels () {
    return Object.keys( Views ).map( (label, index) => (
      <Panel key={ label } value={ tab } index={ index }>
        { renderPanel( label ) }
      </Panel>
    ))
  }

  function renderTabs () {
    return Object.keys( Views ).map( (label, index) => (
      <Tab key={ label } label={ label } { ...GetTabProps( index ) } />
    ))
  }

  return (
    <Fragment>
      <AppBar position='relative' color='default'>
        <Toolbar className={ classes.grow }>
          <Typography  className={ classes.grow } variant='h6' color='inherit' noWrap>
            Connectics API Admin
          </Typography>

          { authenticated ? <Button color='inherit'>Logout</Button> : null }
        </Toolbar>
      </AppBar>

      { !authenticated ? <Auth /> : (
        <div className={ classes.layout }>
          <Tabs className={ classes.tabs } onChange={ handleChange } orientation='vertical' value={ tab } variant='scrollable'>
            { renderTabs() }
          </Tabs>

          { renderPanels() }
        </div>
      )}
    </Fragment>
  )
}
