import 'core-js/stable'
import 'regenerator-runtime/runtime'

import './src/styles.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline'

import { post_credentials } from './src/actions'
import Application from './src/components/'
import Store from './src/store'

const Theme = createMuiTheme({
  palette: {
    type: 'light'
  }
})

ReactDOM.render(
  <Provider store={ Store }>
    <ThemeProvider theme={ Theme }>
      <ScopedCssBaseline>
        <Application />
      </ScopedCssBaseline>
    </ThemeProvider>
  </Provider>,

  document.getElementById( 'root' )
)

/**/
Store.dispatch( post_credentials({
  username: 'connectics',
  password: 'cnx427!'
}))
/**/
