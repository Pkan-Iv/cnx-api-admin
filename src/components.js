import React from 'react'
import { Admin, Resource, ListGuesser } from 'react-admin'

import dataProvider from './providers'

export default function MainComponent () {
  return (
    <div className='row flex fullscreen'>
      <Admin dataProvider={ dataProvider }>
        <Resource name='Whitelabels' list={ ListGuesser } />
        <Resource name='Projects' list={ ListGuesser } />
        <Resource name='Users' list={ ListGuesser } />
        <Resource name='EntryPoints' list={ ListGuesser } />
      </Admin>
    </div>
  )
}
