import React, { Fragment, useEffect, useState } from 'react'

import { Box, Button, CircularProgress, MenuItem, Select, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Delete, Edit, Save } from '@material-ui/icons'

import { useStore } from '../../lib/hooks'
import { useLanguages, useProjects, useTypes } from '../hooks'
import { USER } from '../descriptors'

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'block',
    width: '100%'
  },

  input: {
    margin: '5 auto',
    width: '60%'
  }
}))

function Selector ({ label = '', onChange, value = '', values } = {}) {
  const classes = useStyles()

  function renderValues () {
    return values.map( ({ id, name }) => (
      <MenuItem key={ id } value={ id }>
        { name }
      </MenuItem>
    ))
  }

  if (values === undefined) {
    return <CircularProgress />
  }

  return (
    <TextField className={ classes.input }
      id={ label.toLowerCase() }
      label={ label }
      margin='normal'
      onChange={ onChange }
      select
      value={ value }
      variant='outlined' >
      { renderValues() }
    </TextField>
  )
}

export function User({
  create = null,
  id = null,
  leave = null,
  remove = null,
  update = null
} = {}) {
  const classes = useStyles(),
        [{ action, rows }, dispatch] = useStore(),
        [ fields, setFields ] = useState(
          rows.filter( (row) => row.id === id)[0] || {
            display_name: '',
            language: '',
            login: '',
            project_ref: '',
            type: ''
          }
        ),
        languages = useLanguages(),
        projects = useProjects(),
        types = useTypes()

  function createChangeHandler(field) {
    return (e) => {
      setFields({ ...fields, [field]: e.target.value })
    }
  }

  function handleRemove(e) {
    e.preventDefault()

    if (remove !== null && typeof remove === 'function') {
      dispatch(remove(id))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (id === null) {
      if (create !== null && typeof create === 'function') {
        dispatch(create(fields))
      }
    }
    else {
      if (update !== null && typeof update === 'function') {
        dispatch(update(id, fields))
      }
    }
  }

  function renderCreateButton() {
    if (id !== null)
      return null

    return (
      <Button className={classes.submit}
        color="primary"
        type="submit"
        startIcon={<Save />}
        variant="contained">
        CREATE
      </Button>
    )
  }

  function renderRemoveButton() {
    if (id === null)
      return null

    return (
      <Button className={classes.submit}
        color="secondary"
        onClick={handleRemove}
        startIcon={<Delete />}
        variant="contained">
        REMOVE
      </Button>
    )
  }

  function renderUpdateButton() {
    if (id === null)
      return null

    return (
      <Button className={classes.submit}
        color="primary"
        type="submit"
        startIcon={<Edit />}
        variant="contained">
        UPDATE
      </Button>
    )
  }

  useEffect( () => {
    if (typeof leave === 'function') {
      switch (action) {
        case USER.CREATE.SUCCESS:
        case USER.DELETE.SUCCESS:
        case USER.UPDATE.SUCCESS:
          leave()
      }
    }
  }, [ action ])

  return (
    <Fragment>
      <Box className={ classes.box }>
        <h3>{id !== null ? `Edit user ${id}` : 'Create an user'}</h3>
      </Box>

      <form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Box component='span' display='block' height='100%' >
          <TextField className={classes.input}
            id='display_name'
            label='Username'
            defaultValue={fields.display_name}
            onChange={createChangeHandler('display_name')}
            variant='outlined'
            margin='normal'
          />

          <TextField className={classes.input}
            id='login'
            label='Login'
            defaultValue={fields.login}
            onChange={createChangeHandler('login')}
            variant='outlined'
            margin='normal'
          />

          <Selector label='Language' onChange={ createChangeHandler('language') }
            value={ fields.language }
            values={ languages }
          />

          <Selector label='Project' onChange={ createChangeHandler('project_ref') }
            value={ fields.project_ref }
            values={ projects }
          />

          <Selector label='Type' onChange={ createChangeHandler('type') }
            value={ fields.type }
            values={ types }
          />
        </Box>

        {renderCreateButton()}
        {renderUpdateButton()}
        {renderRemoveButton()}
      </form>
    </Fragment>
  )
}
