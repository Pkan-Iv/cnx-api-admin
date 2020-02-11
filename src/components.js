import React from 'react'
import { Admin, Resource, ListGuesser } from 'react-admin'

import { AuthProvider, DataProvider } from './providers'

export default function MainComponent () {
  return (
    <div className='row flex fullscreen'>
      <Admin authProvider={ AuthProvider } dataProvider={ DataProvider }>
        <Resource name='Users' list={ ListGuesser }/>
      </Admin>
    </div>
  )
}
