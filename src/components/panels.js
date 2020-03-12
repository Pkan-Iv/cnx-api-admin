import React from 'react'

import {
  create_user,
  delete_user,
  get_users,
  update_user
} from '../actions'

import {
  useLanguages,
  useProjects,
  useTypes
} from '../hooks'

import DataTable from './datatable'

export default {
  Users () {
    const actions = {
      create: create_user,
      delete: delete_user,
      get: get_users,
      update: update_user
    }

    const fields = [
      { name: 'display_name', label: 'Username', type: 'input' },
      { name: 'login', label: 'Login', type: 'input' },
      { name: 'type', label: 'Type', type: 'select', source: useTypes },
      { name: 'language', label: 'Language', type: 'select', source: useLanguages },
      { name: 'project', label: 'Project', type: 'select', source: useProjects },
      { name: 'whitelabel', label: 'Whitelabel' }
    ]

    const props = { actions, fields }
    return <DataTable { ...props } />
  }
}
