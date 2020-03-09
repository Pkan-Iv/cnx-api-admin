import React, { Fragment, useEffect } from 'react'

import { Box, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Delete, Edit, Save } from '@material-ui/icons'

import { useFormFields } from '../hooks'
import { useStore } from '../../lib/hooks'

const useStyles = makeStyles((theme) => ({
  input: {
    margin: '5 auto',
    width: '60%'
  }
}))

export const Add = ({ actions = { create: null } }) => {
  const [state, dispatch] = useStore()
  const classes = useStyles()
  const [fields, handleFieldChange] = useFormFields({
    login: '',
    display_name: '',
    type: '',
    language: '',
    project_ref: ''
  })

  const { create } = actions
  const { display_name, language, login, project, type } = fields

  function handleSubmit(e) {

    e.preventDefault()

    dispatch(create(fields))
  }

  return (
    <Fragment>
      <Box>
        <h3>Add a new user</h3>
      </Box>
      <form
        autoComplete='off'
        noValidate
        onSubmit={handleSubmit}
      >
        <Box component='span' display='block' height='100%' >
          <TextField className={classes.input} id='login' label='Login' onChange={handleFieldChange} variant='outlined' margin='normal' />
          <TextField className={classes.input} id='display_name' label='Username' onChange={handleFieldChange} variant='outlined' margin='normal' />
          <TextField className={classes.input} id='type' label='Type' onChange={handleFieldChange} variant='outlined' margin='normal' />
          <TextField className={classes.input} id='language' label='Language' onChange={handleFieldChange} variant='outlined' margin='normal' />
          <TextField className={classes.input} id='project' label='Project' onChange={handleFieldChange} variant='outlined' margin='normal' />
        </Box>

        <Button
          className={classes.submit}
          color="primary"
          type="submit"
          startIcon={<Save />}
          variant="contained"
        >
          SAVE
          </Button>
      </form>
    </Fragment>
  )
}

export const Update = ({ actions = { edit: null, get: null, remove: null }, id }) => {
  const [{ rows }, dispatch] = useStore()
  const classes = useStyles()
  const row = rows.map((item) => {
    if (id === item.id) return item
  }).filter((data) => data != undefined)
    .reduce((a, v) => ({ ...a }, v), {})

  const {
    whitelabel_ref,
    whitelabel,
    project_ref,
    project,
    type,
    login,
    display_name,
    language
  } = row

  const [fields, handleFieldChange] = useFormFields({
    display_name: display_name,
    login: login,
    type: type,
    language: language,
    project: project,
    whitelabel: whitelabel
  })
  const { edit, get, remove } = actions

  useEffect(() => {
    dispatch(get(id))
  }, [])


  function handleRemove(e) {

    e.preventDefault()

    dispatch(remove(id))
    console.log('Remove this user')
  }

  function handleSubmit(e) {

    e.preventDefault()

    dispatch(edit(id, fields))

  }


  return (
    <Fragment>
      <Box>
        <h3>Edit user {id} </h3>
      </Box>
      <div>
        <form
          autoComplete='off'
          noValidate
          onSubmit={handleSubmit}
        >
          <Box component='span' display='block' height='100%' >
            <TextField className={classes.input} id='display_name' label='Username' defaultValue={display_name} onChange={handleFieldChange} variant='outlined' margin='normal' />
            <TextField className={classes.input} id='login' label='Login' defaultValue={login} onChange={handleFieldChange} variant='outlined' margin='normal' />
            <TextField className={classes.input} id='type' label='Type' defaultValue={type} onChange={handleFieldChange} variant='outlined' margin='normal' />
            <TextField className={classes.input} id='language' label='Language' defaultValue={language} onChange={handleFieldChange} variant='outlined' margin='normal' />
            <TextField className={classes.input} id='project' label='Project' defaultValue={project} onChange={handleFieldChange} variant='outlined' margin='normal' />
            <TextField className={classes.input} id='whitelabel' label='Whitelabel' defaultValue={whitelabel} onChange={handleFieldChange} variant='outlined' margin='normal' />
          </Box>

          <Button
            className={classes.submit}
            color="primary"
            type="submit"
            startIcon={<Edit />}
            variant="contained"
          >
            EDIT
          </Button>
          <Button
            className={classes.submit}
            color="secondary"
            onClick={handleRemove}
            startIcon={<Delete />}
            variant="contained"
          >
            REMOVE
          </Button>

        </form>
      </div>
    </Fragment>
  )
}
