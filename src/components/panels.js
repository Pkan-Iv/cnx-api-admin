import React, { Fragment } from 'react'

import {
  create_users,
  get_all_users,
  get_one_users
} from '../actions'

import DataTable from './datatable'
import { Add, Edit } from './users'

export default {
  Users: {
    add: () => <Add actions={{create: create_users}} />,

    edit: ({ id }) => {
      return <Edit id={ id } actions={{get: get_one_users}} />
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
