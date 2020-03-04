import React from 'react'

import {
  get_all_users
} from '../actions'

import DataTable from './datatable'
import { Box, TextField } from '@material-ui/core'

export default {
  Users: {
    add: () => (
      <h3>Add a new user</h3>
    ),

    edit: ({ id, select }) => {

      const input = {
        margin: '5 auto',
        width: '60%'
      }

      // <h3>Edit user { id}</h3>


      return (
        <form
          autoComplete='off'
          noValidate
          width='auto'
        >
          <Box component='span' display='block' height='100%' >
            <TextField id='username' label='Username' variant='outlined' margin='normal' style={ input } />
            <TextField id='login' label='Login' variant='outlined' margin='normal' style={ input } />
            <TextField id='type' label='Type' variant='outlined' margin='normal' style={ input } />
            <TextField id='language' label='Language' variant='outlined' margin='normal' style={ input } />
            <TextField id='project' label='Project' variant='outlined' margin='normal' style={ input } />
            <TextField id='whitelabel' label='Whitelabel' variant='outlined' margin='normal' style={ input } />
          </Box>
        </form>
      )
    },

    list: ({ create, select }) => (
      <DataTable cells={[
        { name: 'display_name', label: 'Username', align: 'left' },
        { name: 'login', label: 'Login', align: 'left' },
        { name: 'type', label: 'Type', align: 'left' },
        { name: 'language', label: 'Language', align: 'center' },
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
