import React from 'react'
import { Provider } from 'react-redux'
import { createHashHistory } from 'history'
import { Admin, Resource } from 'react-admin'

import { AuthProvider, DataProvider } from './providers'
import { UserEdit, UserList, UserShow } from './users'
import CreateStore from './store'

const History = createHashHistory()

const Store = CreateStore({
  authProvider: AuthProvider,
  dataProvider: DataProvider,
  history: History
})

export default function MainComponent () {
  return (
    <Provider store={ Store }>
      <Admin authProvider={ AuthProvider } dataProvider={ DataProvider } history={ History }>
        <Resource name='users' list={ UserList } show={ UserShow } edit={ UserEdit }/>
      </Admin>
    </Provider>
  )
}
