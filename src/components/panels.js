import React from 'react'

import {
  delete_pra_accounts,
  get_pra_accounts,
  get_pra_all,
  get_pra_messages,
  get_pra_numbers,
  get_pra_plans,
  get_pra_projects,
  patch_pra_accounts,
  post_pra_accounts
} from '../actions'

import {
  useMessages,
  useNumbers,
  usePlans,
  useProjects,
  useRoles
} from '../hooks'

import DataTable from './datatable'

/*
const fields = [
  { name: 'display_name', label: 'Username', type: 'input' },
  { name: 'login', label: 'Login', type: 'input' },
  { name: 'password', label: 'Password', type: 'password', filter: false, visible: false },
  { name: 'type', label: 'Type', type: 'select', source: useTypes },
  { name: 'language', label: 'Language', type: 'select', source: useLanguages },
  { name: 'project', label: 'Project', type: 'select', source: useProjects, bind: 'project_ref' },
  { name: 'whitelabel', label: 'Whitelabel', filter: false }
]
*/
export default {
  Accounts (acls, { height }) {
    const actions = {
      create: post_pra_accounts,
      read: get_pra_accounts,
      update: patch_pra_accounts,
      delete: delete_pra_accounts
    }

    const fields = [
      { name: 'project', label: 'Project', type: 'select', source: useProjects, bind: 'project_id' },
      { name: 'username', label: 'Username', type: 'input' },
      { name: 'password', label: 'Password', type: 'password', filter: false, visible: false },
      { name: 'role', label: 'Role', type: 'select', source: useRoles, bind: 'role_id' }
    ]

    const props = { acls, actions, fields, height }
    return <DataTable { ...props } />
  },

  Messages (acls, { height }) {
    const actions = {
      create: null,
      delete: null,
      read: get_pra_messages,
      update: null
    }

    const fields = [
      { name: 'project', label: 'Project', type: 'select', source: useProjects, bind: 'project_id' },
      { name: 'name', label: 'Message', type: 'input' },
      { name: 'path', label: 'Path', type: 'input' }
    ]

    const props = { acls, actions, fields, height }
    return <DataTable { ...props } />
  },

  Numbers (acls, { height }) {
    const actions = {
      create: null,
      delete: null,
      read: get_pra_numbers,
      update: null
    }

    const fields = [
      { name: 'project', label: 'Project', type: 'select', source: useProjects, bind: 'project_id' },
      { name: 'label', label: 'Label', type: 'input' },
      { name: 'number', label: 'Number', type: 'input' }
    ]

    const props = { acls, actions, fields, height }
    return <DataTable { ...props } />
  },

  Plans (acls, { height }) {
    const actions = {
      create: null,
      delete: null,
      read: get_pra_plans,
      update: null
    }

    const fields = [
      { name: 'project', label: 'Project', type: 'select', source: useProjects, bind: 'project_id' },
      { name: 'name', label: 'Plan', type: 'input' },
      { name: 'message', label: 'Message', type: 'select', source: useMessages, bind: 'message_id' },
      { name: 'destination', label: 'Destination', type: 'input' }
    ]

    const props = { acls, actions, fields, height }
    return <DataTable { ...props } />
  },

  Pra (acls, { height }) {
    const actions = {
      create: null,
      delete: null,
      read: get_pra_all,
      update: null
    }

    const fields = [
      { name: 'plan', label: 'Plan', type: 'select', source: usePlans, bind: 'plan_id' },
      { name: 'number', label: 'Number', type: 'select', source: useNumbers, bind: 'number_id' },
      { name: 'message', label: 'Message', type: 'select', source: useMessages, bind: 'message_id' },
      { name: 'destination', label: 'Destination', type: 'input' }
    ]

    const props = { acls, actions, fields, height }
    return <DataTable { ...props } />
  },

  Projects (acls, { height }) {
    const actions = {
      create: null,
      delete: null,
      read: get_pra_projects,
      update: null
    }

    const fields = [
      { name: 'name', label: 'Project', type: 'input' },
      { name: 'plan', label: 'Plan', type: 'select', source: usePlans, bind: 'plan_id' },
      { name: 'country', label: 'Country', type: 'input' },
      { name: 'whitelabel', label: 'Whitelabel', type: 'input' }
    ]

    const props = { acls, actions, fields, height }
    return <DataTable { ...props } />
  }
}
