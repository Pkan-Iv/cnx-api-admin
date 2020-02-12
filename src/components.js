import React from 'react'
import { Provider } from 'react-redux'
import { createHashHistory } from 'history'
import { Admin, Resource, ListGuesser, ShowGuesser } from 'react-admin'

import { AuthProvider, DataProvider } from './providers'
import { UserList, UserShow } from './users'
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
        <Resource name='Users' list={ UserList } show={ UserShow }/>
      </Admin>
    </Provider>
  )
}
