import React, { Fragment, useEffect } from 'react'

import { Box, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useFormFields } from '../hooks'
import { useStore } from '../../lib/hooks'

const useStyles = makeStyles((theme) => ({
  input: {
    margin: '5 auto',
    width: '60%'
  }
}))

export const Add = ({ actions = { create: null }, id }) => {
  const classes = useStyles(),
  [ fields, handleFieldChange ] = useFormFields({
    login: '',
    display_name: '',
    type: '',
    language: '',
    project_ref: ''
  })

  function handleSubmit (e) {
    const { display_name, language, login, project_ref, type } = fields

    e.preventDefault()

    dispatch({ type: USERS.CREATE.SUCCESS })
    console.log(display_name)
    console.log(language)
    console.log(login)
    console.log(project_ref)
    console.log(type)
  }

  return (
    <Fragment>
      <Box>
        <h3>Add a new user</h3>
      </Box>
      <form
        autoComplete='off'
        noValidate
        onSubmit={ handleSubmit }
      >
        <Box component='span' display='block' height='100%' >
        <TextField className={classes.input} id='login' label='Login' onChange={ handleFieldChange } variant='outlined' margin='normal' />
          <TextField className={classes.input} id='display_name' label='Username' onChange={ handleFieldChange } variant='outlined' margin='normal' />
          <TextField className={classes.input} id='type' label='Type' onChange={ handleFieldChange } variant='outlined' margin='normal' />
          <TextField className={classes.input} id='language' label='Language' onChange={ handleFieldChange } variant='outlined' margin='normal' />
          <TextField className={classes.input} id='project_ref' label='Project' onChange={ handleFieldChange } variant='outlined' margin='normal' />
        </Box>

        <Button
            className={ classes.submit }
            color="primary"
            type="submit"
            variant="contained"
          >
            SAVE
          </Button>
      </form>
    </Fragment>
  )
}

export const Edit = ({ actions = { get: null }, id }) => {
  const [{ rows }, dispatch] = useStore()
  const classes = useStyles()
  const field = rows.map((item) => {
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
  } = field

  useEffect(() => {
    const { get } = actions
    dispatch(get(id))
  }, [])

  return (
    <Fragment>
      <Box>
        <h3>Edit user {id} </h3>
      </Box>
      <div>
        <form
          autoComplete='off'
          noValidate
        >
          <Box component='span' display='block' height='100%' >
            <TextField className={classes.input} defaultValue={display_name} variant='outlined' margin='normal' />
            <TextField className={classes.input} defaultValue={login} variant='outlined' margin='normal' />
            <TextField className={classes.input} defaultValue={type} variant='outlined' margin='normal' />
            <TextField className={classes.input} defaultValue={language} variant='outlined' margin='normal' />
            <TextField className={classes.input} defaultValue={project} variant='outlined' margin='normal' />
            <TextField className={classes.input} defaultValue={whitelabel} variant='outlined' margin='normal' />
          </Box>
        </form>
      </div>
    </Fragment>
  )
}
