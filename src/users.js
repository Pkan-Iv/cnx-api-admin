import React, { useState, useEffect } from 'react';

import {
  Datagrid,
  DateField,
  DateInput,
  Edit,
  Error,
  Filter,
  List,
  Loading,
  NumberField,
  NumberInput,
  SelectInput,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  useDataProvider
} from 'react-admin'

const LanguageSelector = (props) => {
    const dataProvider = useDataProvider()
    const [ languages, setLanguages ] = useState()
    const [ loading, setLoading ] = useState( true )
    const [ error, setError ] = useState()

    useEffect( () => {
      dataProvider.getList( 'XM_Languages', {
        filter: {},
        pagination: { page: 1, perPage: 100 },
        sort: {
          field: 'language',
          order: 'ASC'
        }
      }).then( ({ data }) => {
        setLanguages( data.map( (row) => {
          return { id: row.language, name: row.language }
        }))

        setLoading( false )
      }).catch( (error) => {
        setError( error )
        setLoading( false )
      })
    }, [])

    if (loading) {
      return <Loading />
    }

    if (error) {
      return <Error />
    }

    return (
      <SelectInput { ...props } choices={ languages } />
    )
}

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
    <LanguageSelector label="Search by Language" source="language" alwaysOn />
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

