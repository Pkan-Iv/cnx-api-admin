import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Toolbar,
} from '@material-ui/core'

import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },

  layout: {
    flexGrow: 1,
    height: '100vh',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 'auto',

    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },

  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),

    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    },


    submit: {
      margin: '0 auto'
    }
  }
}))


export function LoginComponent(props) {

  // Hook that gets the credentials
  function useFormFields(initialState) {
    const [fields, setValues] = useState(initialState)

    return [
      fields,
      function (event) {
        setValues({
          ...fields,
          [event.target.id]: event.target.value
        })
      }
    ]
  }

  const classes = useStyles()

  // Input fields
  const [fields, handleFieldChange] = useFormFields({
    username: '',
    password: ''
  }),
    { password, username } = fields



  function handleSubmit(e) {

    e.preventDefault()

    alert('Login successful!')

    // TODO authentication

    console.log(username)
    console.log(password)
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        autoFocus
        fullWidth
        id="username"
        label="Username"
        margin="normal"
        name="username"
        onChange={handleFieldChange}
        required
        variant="outlined"
      />

      <TextField
        fullWidth
        id="password"
        label="Password"
        margin="normal"
        name="password"
        onChange={handleFieldChange}
        required
        type="password"
        variant="outlined"
      />


      <Box
        display="flex"
        justifyContent="center">
        <Button
          className={classes.submit}
          color="primary"
          type="submit"
          variant="contained"
        >
          Sign In
        </Button>
      </Box>
    </form>
  )
}


export default function () {
  const classes = useStyles()

  return (
    <React.Fragment>
      <AppBar position='absolute' color='default' className={classes.appBar}>
        <Toolbar>
          <Typography variant='h6' color='inherit' noWrap>
            Connectics API Admin
          </Typography>
        </Toolbar>
      </AppBar>

      <Container className={classes.layout} fixed>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <LoginComponent />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}
