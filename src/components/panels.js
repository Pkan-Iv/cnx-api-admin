import React from 'react'

import {
  create_user,
  delete_user,
  get_users,
  update_user
} from '../actions'

import DataTable from './datatable'
import { User } from './views'

export default {
  Users: {
    list: ({ create, select }) => (
      <DataTable cells={[
        { name: 'display_name', label: 'Username', align: 'left' },
        { name: 'login', label: 'Login', align: 'left' },
        { name: 'type', label: 'Type', align: 'left' },
        { name: 'language', label: 'Language', align: 'center' },
        { name: 'project', label: 'Project', align: 'left' },
        { name: 'whitelabel', label: 'Whitelabel', align: 'left' }
      ]} actions={{
        get: get_users,
        create,
        select
      }} />
    ),

    show: ({ id, leave }) => (
      <User create={ create_user } id={ id } leave={ leave } remove={ delete_user } update={ update_user } />
    )
  }
}
