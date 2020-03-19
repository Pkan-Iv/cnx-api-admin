import React, { useState } from 'react'

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import {
  Cancel,
  Delete,
  Edit,
  Save,
  Search
} from '@material-ui/icons'

import FormButton from './button'
import FormCheckbox from './checkbox'
import FormSelect from './select'

import { MergeObject } from 'lib/factories'
import { useStore } from 'lib/hooks'


const useStyles = makeStyles( (theme) => ({
  box: {
    display: 'block'
  },

  input: {
    margin: '5 auto',
    width: '60%'
  }
}))

export default function FormDialog ({
  actions = {
    close: null,
    create: null,
    delete: null,
    search: null,
    update: null
  },
  data = null,
  fields = [],
  id = null,
  title = null,
  type = 'search'
} = {}) {
  const classes = useStyles(),
        [ values, setValues ] = useState( data || {} ),
        [ visible, setVisible ] = useState( true ),
        [ {}, dispatch ] = useStore()

  function createHandler (field) {
    return (e) => {
      const { checked, value } = e.target

      setValues({ ...values, [ field ]: checked !== undefined ? (
        checked === true ? 1 : 0
       ) : value })
    }
  }

  function handleClose () {
    setVisible( false )

    if ('close' in actions) {
      if (typeof actions.close === 'function') {
        actions.close()
      }
    }
  }

  function handleDelete () {
    if ('delete' in actions) {
      if (typeof actions.delete === 'function') {
        dispatch( actions.delete( id ))
      }
    }

    handleClose()
  }

  function handleSubmit (e) {
    const action = actions[ type ],
          content = MergeObject( fields.map(
            ({ name }) => ({ [ name ]: values[ name ] })
          ))

    e.preventDefault()

    if (typeof action === 'function') {
      if (type !== 'search') {
        dispatch( action( content , id ))
      }
      else {
        action( content )
      }
    }

    handleClose()
  }

  function renderButtonCreate () {
    if (type === 'create') {
      return (
        <FormButton click={ handleSubmit } icon={ <Save /> } type='submit'>
          CREATE
        </FormButton>
      )
    }
  }

  function renderButtonRemove () {
    if (type === 'update') {
      return (
        <FormButton click={ handleDelete } color='secondary' icon={ <Delete /> }>
          REMOVE
        </FormButton>
      )
    }
  }

  function renderButtonSearch () {
    if (type === 'search') {
      return (
        <FormButton click={ handleSubmit } icon={ <Search /> } type='submit'>
          SEARCH
        </FormButton>
      )
    }
  }

  function renderButtonUpdate () {
    if (type === 'update') {
      return (
        <FormButton click={ handleSubmit } icon={ <Edit /> } type='submit'>
          UPDATE
        </FormButton>
      )
    }
  }

  function renderFormFields () {
    return fields.map( ({ name, label, type, source }, index) => {
      const props = {
        className: classes.input,
        id: name,
        key: index,
        label,
        margin: 'normal',
        onChange: createHandler( name ),
        type,
        variant: 'outlined'
      }

      switch (type) {
        case 'select':
          return (
            <FormSelect { ...props }
              dataHandler={ source }
              value={ values[ name ] }
            />
          )

        case 'check':
          return (
            <FormCheckbox {...props}
              dataHandler={ source }
              value={values[ name ]}
            />
          )

        default:
          return (
            <TextField { ...props }
              defaultValue={ values[ name ] }
            />
          )
      }
    })
  }

  return (
    <Dialog disableBackdropClick={ true }
      maxWidth='lg'
      open={ visible }
      onClose={ handleClose }>
      <DialogTitle id='form-dialog-title' className={ classes.box }>
        <span>{ title }</span>

        <IconButton onClick={handleClose} style={{'float': 'right'}}>
          <Cancel />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <form autoComplete='off' noValidate onSubmit={ handleSubmit }>
          <Box component='span' display='block' height='100%' >
            { renderFormFields() }
          </Box>
        </form>
      </DialogContent>

      <DialogActions disableSpacing={ true } style={{ 'display':' block' }} >
        { renderButtonCreate() }
        { renderButtonUpdate() }
        { renderButtonRemove() }
        { renderButtonSearch() }
      </DialogActions>
    </Dialog>
  )
}
