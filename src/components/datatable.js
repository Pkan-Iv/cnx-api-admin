import React, { useEffect, useState } from 'react'

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { Add, Delete, Edit, Save } from '@material-ui/icons'

import { MergeObject } from '../../lib/factories'
import { useStore } from '../../lib/hooks'

const useStyles = makeStyles( (theme) => ({
  box: {
    display: 'block'
  },

  fab: {
    position: 'absolute',
    bottom: theme.spacing( 2 ),
    right: theme.spacing( 2 )
  },

  input: {
    margin: '5 auto',
    width: '60%'
  },

  paper: {
    width: '100%',
    marginBottom: theme.spacing( 2 )
  },

  root: {
    width: '100%',
  },

  table: {
    minWidth: '100%'
  }
}))

function FormSelect ({
  dataHandler = null,
  label = '',
  multiple = false,
  onChange,
  value = ''
} = {}) {
  const classes = useStyles(),
        values = dataHandler()

  function renderValues () {
    return values.map( ({ id, name }) => (
      <MenuItem key={ id } value={ id }>
        { name }
      </MenuItem>
    ))
  }

  if (values === undefined) {
    // return <CircularProgress />
    return null
  }

  return (
    <TextField className={ classes.input }
      id={ label.toLowerCase() }
      label={ label }
      margin='normal'
      onChange={ onChange }
      select
      value={ value }
      variant='outlined'>
      { renderValues() }
    </TextField>
  )
}

function FormButton ({
  children = null,
  click = () => null,
  color = 'primary',
  icon = null,
  type = 'button'
} = {}) {
  const classes = useStyles()

  const props = {
    className: classes.submit,
    color,
    onClick: click,
    startIcon: icon,
    type,
    variant: 'contained'
  }

  return (
    <Button { ... props }>
      { children }
    </Button>
  )
}

function FormDialog ({
  actions = {
    close: null,
    create: null,
    delete: null,
    update: null
  },
  data = null,
  fields = [],
  id = null
} = {}) {
  const classes = useStyles(),
        [ values, setValues ] = useState( data || {} ),
        [ visible, setVisible ] = useState( true ),
        [ {}, dispatch ] = useStore()

  function createHandler (field) {
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
    const { create, update } = actions,
          action = id === null ? create : update

    e.preventDefault()

    if (typeof action === 'function') {
      dispatch( action( MergeObject( fields.map(
        ({ name }) => ({ [ name ]: values[ name ] })
      )), id ))
    }

    handleClose()
  }

  function renderButtonCreate () {
    if (id === null) {
      return (
        <FormButton click={ handleSubmit } icon={ <Save /> } type='submit'>
          CREATE
        </FormButton>
      )
    }
  }

  function renderButtonRemove () {
    if (id !== null) {
      return (
        <FormButton click={ handleDelete } color='secondary' icon={ <Delete /> }>
          REMOVE
        </FormButton>
      )
    }
  }

  function renderButtonUpdate () {
    if (id !== null) {
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

      if (type === 'select') {
        return (
          <FormSelect { ...props }
            dataHandler={ source }
            value={ values[ name ] }
          />
        )
      }
      else {
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
        UNTITLED DIALOG
      </DialogTitle>

      <DialogContent>
        <form autoComplete='off' noValidate onSubmit={ handleSubmit }>
          <Box component='span' display='block' height='100%' >
            { renderFormFields() }
          </Box>
        </form>
      </DialogContent>

      <DialogActions>
        { renderButtonCreate() }
        { renderButtonUpdate() }
        { renderButtonRemove() }
      </DialogActions>
    </Dialog>
  )
}

export default function DataTable({
  actions = {
    create: null,
    delete: null,
    get: null,
    update: null
  },
  fields = []
} = {}) {
  const classes = useStyles(),
        [ dialog, setDialog ] = useState({
          selected: null,
          visible: false
        }),
        [ page, setPage ] = useState( 0 ),
        [ sort, setSort ] = useState({
          field: fields[0].name,
          order: 'asc'
        }),
        [{ count, rows }, dispatch ] = useStore(),
        rowsPerPage = 20

  function createHandler (handler, property) {
    return (event) => handler( event, property )
  }

  function handleChange (e, value) {
    setPage( value )
  }

  function handleClose () {
    setDialog({
      selected: null,
      visible: false
    })
  }

  function handleCreate () {
    setDialog({
      selected: null,
      visible: true
    })
  }

  function handleSelect (e, id) {
    setDialog({
      selected: id,
      visible: true
    })
  }

  function handleSort (e, field) {
    setSort({
      field,
      order: (sort.field === field && sort.order === 'asc') ? 'desc' : 'asc'
    })
  }

  function renderDialog () {
    const { selected, visible } = dialog

    if (visible) {
      return (
        <FormDialog actions={{ ...actions, close: handleClose }}
          data={ rows.filter( ({ id }) => id === selected )[0] }
          fields={
            fields.filter( ({ type }) => type !== undefined ).map( (field) => {
              const { bind } = field
              return bind ? { ...field, name: bind } : field
            })
          }
          id={ selected }
        />
      )
    }
  }

  function renderHead () {
    return fields.filter( ({ visible }) => visible !== false ).map( ({ label, name }) => {
      const { field, order } = sort,
            clickHandler = createHandler( handleSort, name )

      return (
        <TableCell align='left'
          key={ name }
          padding='default'
          sortDirection={ field === name ? order : false }>
          <TableSortLabel active={ field === name }
            direction={ field === name ? order : 'asc' }
            onClick={ clickHandler }>
            { label }
          </TableSortLabel>
        </TableCell>
      )
    })
  }

  function renderRow (row) {
    return fields.filter( ({ visible }) => visible !== false ).map( ({ align, name }) => (
      <TableCell key={ name } align={ align ? align : 'left' }>
        { row[name] }
      </TableCell>
    ))
  }

  function renderRows () {
    return rows.map( (row) => {
      const { id } = row,
            selectHandler = createHandler( handleSelect, id )

      return (
        <TableRow key={ id } hover tabIndex={ -1 } onClick={ selectHandler }>
          { renderRow( row ) }
        </TableRow>
      )
    })
  }

  useEffect( () => {
    const { get } = actions

    if (typeof get === 'function') {
      const { field, order } = sort

      dispatch( get({
        _p: page + 1,
        _n: rowsPerPage,
        _s: `${(order === 'desc' ? '-' : '' )}${field}`
      }))
    }
  }, [ dialog, page, sort ])

  return (
    <div className={ classes.root }>
      <TableContainer>
        <Box component='div' m={ 1 } />

        <Table className={ classes.table } size='small' stickyHeader>
          <TableHead>
            <TableRow>
              { renderHead() }
            </TableRow>
          </TableHead>

          <TableBody>
            { renderRows() }
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[ rowsPerPage ]}
        component='div'
        count={ count }
        rowsPerPage={ rowsPerPage }
        page={ page }
        onChangePage={ handleChange }
      />

      { renderDialog() }

      <Fab className={ classes.fab } color="primary" onClick={ handleCreate }>
        <Add />
      </Fab>
    </div>
  )
}

