import React from 'react'

import {
  Datagrid,
  Edit,
  Error,
  Filter,
  List,
  Loading,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput
} from 'react-admin'

import { useDataLoader } from './hooks'

const CustomSelector = ({ error, loading, props, values }) => (
  loading ? <Loading /> : (
    error ? <Error /> : <SelectInput {...props} choices={values} />
  )
)

const LanguageSelector = (props) => {
  const [error, loading, values] = useDataLoader({
    mapper: (row) => ({ id: row.language, name: row.language }),
    resource: 'languages',
  })

  return <CustomSelector { ...{ error, loading, props, values }} />
}

const ProjectSelector = (props) => {
  const [error, loading, values] = useDataLoader({
    mapper: (row) => ({ id: row.name, name: row.name }),
    resource: 'projects'
  })


  return <CustomSelector { ...{ error, loading, props, values }} />
}

const WhitelabelSelector = (props) => {
  const [error, loading, values] = useDataLoader({
    mapper: (row) => ({ id: row.name, name: row.name }),
    resource: 'whitelabels'
  })


  return <CustomSelector { ...{ error, loading, props, values }} />
}

const UserDisplayName = ({ record }) => {
  return <span>User {record ? `"${record.user}"` : ''}</span>
}

const UserFilter = (props) => (
  <Filter {...props}>
    <WhitelabelSelector label="Search by Whitelabel" source="whitelabel" alwaysOn resettable />
    <ProjectSelector label="Search by Project" source="project" alwaysOn resettable />
    <TextInput label="Search by Type" source="type" alwaysOn resettable />
    <TextInput label="Search by User name" source="user" alwaysOn resettable />
    <LanguageSelector label="Search by Language" source="language" alwaysOn resettable />
  </Filter>
)

export const UserEdit = props => (
  <Edit title={<UserDisplayName />} {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <WhitelabelSelector label="Search by Whitelabel" source="whitelabel" alwaysOn />
      <ProjectSelector label="Search by Project" source="project" alwaysOn />
      <TextInput source="type" />
      <TextInput source="user" />
      <LanguageSelector label="Search by Language" source="language" alwaysOn />
    </SimpleForm>
  </Edit>
)

export const UserList = props => (
  <List filters={<UserFilter />} {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="whitelabel" />
      <TextField source="project" />
      <TextField source="type" />
      <TextField source="user" />
      <TextField source="language" />
    </Datagrid>
  </List>
)
