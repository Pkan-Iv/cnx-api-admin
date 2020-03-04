import React from 'react'

import {
  get_all_users
} from '../actions'

import DataTable from './datatable'

export default {
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
