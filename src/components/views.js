import React, { Fragment, useEffect, useState } from 'react'

import { Box, Button, CircularProgress, MenuItem, Select, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Delete, Edit, Save } from '@material-ui/icons'

import { useStore } from '../../lib/hooks'
import { useLanguages, useProjects, useTypes } from '../hooks'

const useStyles = makeStyles((theme) => ({
  input: {
    margin: '5 auto',
    width: '60%'
  }
}))

export function User({
  create = null,
  id = null,
  remove = null,
  update = null
} = {}) {
  const classes = useStyles(),
  [{ rows }, dispatch] = useStore(),
  [fields, setFields] = useState(
    rows.filter((row) => row.id === id)[0] || {
      display_name: '',
      language: '',
      login: '',
      project: '',
      type: ''
    }
  ),
  [values, setValues] = useState('' || { language: '' } || { type: ''} || {
    id: '',
    name: ''
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

  function handleChange(field) {
    return e => {
    setValues({...values, [field]: e.target.value})
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

  function languageSelector() {
    let loaded =false

    if ((languages === undefined)) {
      loaded = false
      return <CircularProgress />
    }
    if(languages !== undefined) {
      loaded = true
      return (
        <TextField className={classes.input}
          id='language'
          label='Language'
          margin='normal'
          onClick={ handleChange('language') }
          onChange={ createChangeHandler('language') }
          select
          value={ values }
          variant='outlined' >
            { languages.map(({ language }) =>(
              <MenuItem key={ language } value={ language }>
                { language }
              </MenuItem>
            )) }
        </TextField>
      )
    }
  }
  function projectSelector() {
    let loaded =false

    if ((projects === undefined)) {
      loaded = false
      return <CircularProgress />
    }
    if(projects !== undefined) {
      loaded = true
      return (
        <TextField className={classes.input}
          id='project'
          label='Project'
          margin='normal'
          onClick={ handleChange('project') }
          onChange={ createChangeHandler('project') }
          select
          value={ values }
          variant='outlined' >
            { projects.map(({ id, name }) =>(
              <MenuItem key={ id } value={ name }>
                { name }
              </MenuItem>
            )) }
        </TextField>
      )
    }
  }
  function typeSelector() {
    let loaded =false

    if ((types === undefined)) {
      loaded = false
      return <CircularProgress />
    }
    if(types !== undefined) {
      loaded = true
      return (
        <TextField className={classes.input}
          id='type'
          label='type'
          margin='normal'
          onClick={ handleChange('type') }
          onChange={ createChangeHandler('type') }
          select
          value={ values }
          variant='outlined' >
            { types.map(({ type }) =>(
              <MenuItem key={ type } value={ type }>
                { type }
              </MenuItem>
            )) }
        </TextField>
      )
    }
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

  return (
    <Fragment>
      <Box>
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

          { languageSelector() }

          { projectSelector() }

          { typeSelector() }

        </Box>

        {renderCreateButton()}
        {renderUpdateButton()}
        {renderRemoveButton()}
      </form>
    </Fragment>
  )
}
