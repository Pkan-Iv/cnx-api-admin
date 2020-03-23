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
  Search,
  Add
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

  function createCheckHandler (field) {
    return (e) => {
      console.log( field, e.target.checked )
      setValues({ ...values, [ field ]: e.target.checked  ? 1 : 0 })
    }
  }

  function createValueHandler (field) {
    return (e) => {
      setValues({ ...values, [ field ]: e.target.value })
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
            ({ name }) =>  (
              typeof values[ name ] === 'object' ? null : ({ [ name ]: values[ name ] })
            )
          ).filter( (value) => value !== null ))

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
        <FormButton click={ handleSubmit } icon={ <Add /> } type='submit'>
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
    return fields.map( (field, index) => {
      const { form, name, label, source } = field

      const props = {
        className: classes.input,
        id: name,
        key: index,
        label,
        margin: 'normal',
        type: field.type,
        variant: 'outlined'
      }

      const disabled = type !== 'search' ? form === false : false

      switch (field.type) {
        case 'check':
          return (
            <FormCheckbox { ...props }
              checked={ values[ name ] === 1 }
              disabled={ disabled }
              onChange={ createCheckHandler( name ) }
            />
          )

        case 'select':
          return (
            <FormSelect { ...props }
              dataHandler={ source }
              disabled={ disabled }
              value={ values[ name ] }
              onChange={ createValueHandler( name ) }
            />
          )

        default:
          return (
            <TextField { ...props }
              defaultValue={ values[ name ] }
              disabled={ disabled }
              onChange={ createValueHandler( name ) }
            />
          )
      }
    })
  }

  return (
    <Dialog
      disableBackdropClick={ true }
      maxWidth='lg'
      open={ visible }
      onClose={ handleClose }
       >
      <div style={ {
        height: '500px',
        width: '715px'
      } }>
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

        <DialogActions disableSpacing={ true }
          style={{ 'display':' block',
            'position': 'absolute',
            'bottom': '0',
            'left': '0',
            'right': '0',
        }} >
          { renderButtonCreate() }
          { renderButtonUpdate() }
          { renderButtonRemove() }
          { renderButtonSearch() }
        </DialogActions>
      </div>
    </Dialog>
  )
}
