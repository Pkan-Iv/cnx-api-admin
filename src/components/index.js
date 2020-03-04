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

import Panel from './panel'
import DataTable from './datatable'

import {
  get_all_users
} from '../actions'

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

const Views = {
  Users: {
    add: () => (
      <h3>Add a new user</h3>
    ),

    edit: ({ id }) => (
      <h3>Edit user { id }</h3>
    ),

    list: ({ create, select }) => (
      <DataTable cells={[
        { name: 'display_name', label: 'Username', align: 'left' },
        { name: 'login', label: 'Login', align: 'left' },
        { name: 'type', label: 'Type', align: 'left' },
        { name: 'language', label: 'Language', align: 'left' },
        { name: 'project', label: 'Project', align: 'left' },
        { name: 'whitelabel', label: 'Whitelabel', align: 'left' }
      ]} actions={{
        get: get_all_users,
        create,
        select
      }} />
    )
  }
}

function GetTabProps (index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  }
}

export default function Application () {
  const classes = useStyles(),
        [ tab, setTab ] = useState( 0 ),
        [ view, setView ] = useState({ type: 'list' })

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

          <Button color='inherit'>Logout</Button>
        </Toolbar>
      </AppBar>

      <div className={ classes.layout }>
        <Tabs className={ classes.tabs } onChange={ handleChange } orientation='vertical' value={ tab } variant='scrollable'>
          { renderTabs() }
        </Tabs>

        { renderPanels() }
      </div>
    </Fragment>
  )
}
