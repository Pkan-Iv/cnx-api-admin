import React from 'react'

import {
  create_user,
  delete_user,
  get_pra,
  get_pra_messages,
  get_pra_numbers,
  get_pra_projects,
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
  Accounts (acls, { height }) {
    const actions = {
      create: create_user,
      read: get_users,
      update: update_user,
      delete: delete_user
    }

    const fields = [
      { name: 'display_name', label: 'Username', type: 'input' },
      { name: 'login', label: 'Login', type: 'input' },
      { name: 'password', label: 'Password', type: 'password', filter: false, visible: false },
      { name: 'type', label: 'Type', type: 'select', source: useTypes },
      { name: 'language', label: 'Language', type: 'select', source: useLanguages },
      { name: 'project', label: 'Project', type: 'select', source: useProjects, bind: 'project_ref' },
      { name: 'whitelabel', label: 'Whitelabel', filter: false }
    ]

    const props = { acls, actions, fields, height }
    return <DataTable { ...props } />
  },

  Messages (acls, { height }) {
    const actions = {
      create: null,
      delete: null,
      get: get_pra_messages,
      update: null
    }

    const fields = [
      // TODO
    ]

    const props = { acls, actions, fields, height }
    return null // <DataTable { ...props } />
  },

  Numbers (acls, { height }) {
    const actions = {
      create: null,
      delete: null,
      get: get_pra_numbers,
      update: null
    }

    const fields = [
      // TODO
    ]

    const props = { acls, actions, fields, height }
    return null // <DataTable { ...props } />
  },

  Pra (acls, { height }) {
    const actions = {
      create: null,
      delete: null,
      get: get_pra,
      update: null
    }

    const fields = [
      // TODO
    ]

    const props = { acls, actions, fields, height }
    return null // <DataTable { ...props } />
  },

  Projects (acls, { height }) {
    const actions = {
      create: null,
      delete: null,
      get: get_pra_projects,
      update: null
    }

    const fields = [
      // TODO
    ]

    const props = { acls, actions, fields, height }
    return null // <DataTable { ...props } />
  }
}
