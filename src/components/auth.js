import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'


import { post_forgotten_credentials } from '../actions'
import { useStore } from 'lib/hooks'
// import GoogleLoginButton from './google'


import { ForgottenPassword } from './forgottenPassword'
import { ResetPassword } from './reset'
import { Signin } from './Signin'

export const useStyles = makeStyles(theme => ({

  paper: {
    left: '0',
    right: '0',
    width: '50%',
    height: '50%',
    margin: 'auto',
    position: 'absolute',
    padding: '16px 8px',
    top: '25%'
  },

  form: {
    height: '100%',
    width: '100%',
  },

  button: {
    bottom: '8px',
    position: 'absolute',
    left: '16px',
    right: '16px',
    }
}))


export default function Auth () {
  const [ { context } ] = useStore(),
        { forgotten, userEmail } = context


  function renderView() {
    if (!forgotten){
     return <Signin />
    }
    if( !userEmail ){
      return<ForgottenPassword />
      }
    return <ResetPassword />
  }


  console.log(userEmail, forgotten)
  return (
    <Fragment>
      {renderView()}
    </Fragment>
   )
}


