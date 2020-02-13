import React from 'react'
import {
  Datagrid,
  DateField,
  DateInput,
  Edit,
  Filter,
  List,
  NumberField,
  NumberInput,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput
} from 'react-admin'

const UserDisplayName = ({ record }) => {
  return <span>User {record ? `"${record.display_name}"` : ''}</span>
}

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search by Id" source="id" alwaysOn />
    <TextInput label="Search by Whitelabel" source="whitelabel" alwaysOn />
    <TextInput label="Search by Project" source="project" alwaysOn />
    <TextInput label="Search by Type" source="type" alwaysOn />
    <TextInput label="Search by Name" source="name" alwaysOn />
    <TextInput label="Search by Language" source="language" alwaysOn />
  </Filter>
)

export const UserEdit = props => (
  <Edit title={<UserDisplayName />} {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <TextField source="whitelabel" />
      <TextField source="project" />
      <TextInput source="type" />
      <TextInput source="name" />
      <TextInput source="language" />
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

