import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import {
  AppBar,
  Container,
  Grid,
  Paper,
  Toolbar
} from '@material-ui/core'

import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles( theme => ({
  appBar: {
    position: 'relative'
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
    }
  }
}))

export default function () {
  const classes = useStyles()

  return (
    <React.Fragment>
      <AppBar position='absolute' color='default' className={ classes.appBar }>
        <Toolbar>
          <Typography variant='h6' color='inherit' noWrap>
            Connectics API Admin
          </Typography>
        </Toolbar>
      </AppBar>

      <Container className={ classes.layout } fixed>
        <Grid container spacing={ 0 }>
          <Grid item xs={ 12 }>
            <Paper className={ classes.paper }>Hello react :)</Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
