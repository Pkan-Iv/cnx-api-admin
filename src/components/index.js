import React, { Fragment } from 'react'

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
  const [value, setValue] = React.useState( 0 ),
        classes = useStyles()

  function handleChange (e, v) {
    setValue( v )
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
        <Tabs className={ classes.tabs }
          onChange={ handleChange }
          orientation='vertical'
          value={ value }
          variant='scrollable'>
          <Tab label='Users' { ...GetTabProps( 0 ) } />
          <Tab label='Queues' { ...GetTabProps( 1 ) } />
          <Tab label='Profiles' { ...GetTabProps( 2 ) } />
        </Tabs>

        <Panel value={ value } index={ 0 }>
          <DataTable cells={[
            { name: 'display_name', label: 'Username' },
            { name: 'login', label: 'Login' },
            { name: 'language', label: 'Language' },
            { name: 'project', label: 'Project' },
            { name: 'whitelabel', label: 'Whitelabel' }
          ]} rows={[]} />
        </Panel>

        <Panel value={ value } index={ 1 }>
          <h3>Queues</h3>
        </Panel>

        <Panel value={ value } index={ 2 }>
          <h3>Profiles</h3>
        </Panel>
      </div>
    </Fragment>
  )
}
