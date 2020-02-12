import React from 'react'
import { Datagrid, DateField, List, NumberField, Show, SimpleShowLayout, TextField } from 'react-admin'

const UserDisplayName = ({ record }) => {
    return <span>User {record ? `"${record.display_name}"` : ''}</span>
}

export const UserList = props => (
    <List {...props}>
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
    <Show title={ <UserDisplayName/> } {...props}>
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

