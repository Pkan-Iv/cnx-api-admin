import React from 'react'

import {
  Datagrid,
  DateField,
  Edit,
  Error,
  Filter,
  List,
  Loading,
  NumberField,
  SelectInput,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput
} from 'react-admin'

import { useDataLoader } from './hooks'

const CustomSelector = ({ error, loading, props, values }) => (
  error ? <Error /> : (
    loading ? <Loading /> : <SelectInput {...props} choices={values} />
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
  return <span>User {record ? `"${record.display_name}"` : ''}</span>
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
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="whitelabel" />
      <TextField source="project" />
      <TextField source="type" />
      <TextField source="user" />
      <TextField source="language" />
    </Datagrid>
  </List>
)

export const UserShow = props => (
  <Show title={<UserDisplayName />} {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="whitelabel" />
      <TextField source="project" />
      <TextField source="type" />
      <TextField source="user" />
      <TextField source="language" />
    </SimpleShowLayout>
  </Show>
)

