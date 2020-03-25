import React from 'react'
import { Box, Button, Paper, TextField } from '@material-ui/core'
import { useStyles } from './auth'

export function ForgottenPassword({ createChangeHandler, handleForgotten, handleRecover }) {
  const classes = useStyles(),
        [ fields, setFields ] = useState({
          email: '',
        }),
        [ forgotten, setForgotten ] = useState( false ),
        [ userEmail, setEmail ] = useState( false ),
        [ state, dispatch ] = useStore()

  function createChangeHandler (field) {
    return (e) => {
      setFields({ ...fields, [ field ]: e.target.value })
    }
  }

  function handleRecover(e) {
    const { email } = fields,
          url = `${HOST}:${PORT}/api/pra/reset`,
          headersConfig = {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json',
            Accept: '*/*'
          }
    const request = { email: email}
    e.preventDefault()

    if (email !== undefined) {
      fetch( url, {
        headers: headersConfig,
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(request)
      })
      .then( (response) => response.json())
      .then( () => setEmail( !userEmail ))
      .catch( (err) => console.log('error', err))
    }

  }
  function handleForgotten () {
    setForgotten(!forgotten)
  }


  return (<Paper className={classes.paper}>
    <form className={classes.form}>
      <TextField
        autoFocus
        fullWidth
        id='email'
        label='Email'
        margin='normal'
        name='email'
        onChange={createChangeHandler('email')}
        required
        variant='outlined' />

      <Box component='div' className={classes.button}>
        <Button className={classes.submit}
          color='secondary'
          onClick={handleForgotten}
          style={{ 'float': 'left' }}
          variant='contained'>
          GO TO SIGN IN
        </Button>
        <Button
         color='primary'
         onClick={handleRecover}
         style={{ 'float': 'right' }}
         variant='contained'>
          SEND EMAIL
        </Button>
      </Box>
    </form>
  </Paper>)
}
