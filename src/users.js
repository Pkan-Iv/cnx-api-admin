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
    field: 'language',
    mapper: (row) => ({ id: row.language, name: row.language }),
    resource: 'XM_Languages',
  })

  return <CustomSelector { ...{ error, loading, props, values }} />
}

const ProjectSelector = (props) => {
  const [error, loading, values] = useDataLoader({
    mapper: (row) => ({ id: row.name, name: row.name }),
    resource: 'Projects'
  })

  return <CustomSelector { ...{ error, loading, props, values }} />
}

const WhitelabelSelector = (props) => {
  const [error, loading, values] = useDataLoader({
    mapper: (row) => ({ id: row.name, name: row.name }),
    resource: 'Whitelabels'
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
    <TextInput label="Search by Name" source="name" alwaysOn resettable />
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
      <TextInput source="name" />
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
      <TextField source="name" />
      <TextField source="language" />
    </Datagrid>
  </List>
)

export const UserShow = props => (
  <Show title={<UserDisplayName />} {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <NumberField source="project_ref" />
      <TextField source="type" />
      <TextField source="login" />
      <TextField source="display_name" />
      <TextField source="language" />
      <TextField source="password.type" />
      <NumberField source="folder_ref" />
      <DateField source="created_at" />
      <DateField source="updated_at" />
    </SimpleShowLayout>
  </Show>
)

