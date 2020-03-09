import React, { Fragment } from 'react'

import {
  create_user,
  delete_one_users,
  get_all_users,
  get_user,
  update_user
} from '../actions'

import DataTable from './datatable'
import { Add, Update } from './users'

export default {
  Users: {
    add: () => <Add actions={{create: create_user}} />,

    edit: ({ id }) => {
      return <Update id={ id } actions={{ edit: update_user, get: get_user, remove: delete_one_users }} />
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
