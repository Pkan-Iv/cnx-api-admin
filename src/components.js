import React from 'react'
import { Admin, Resource, ListGuesser } from 'react-admin'

import authProvider from './authProvider'
import dataProvider from './providers'

export default function MainComponent () {
  return (
    <div className='row flex fullscreen'>
      <Admin authProvider={ authProvider } dataProvider={dataProvider}>
        <Resource/>
      </Admin>
    </div>
  )
}
