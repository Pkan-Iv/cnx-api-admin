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

function CreateHandler (handler, property) {
  return (event) => handler( event, property )
}

function FormSelect ({
  label = '',
  multiple = false,
  onChange,
  value = '',
  values } = {}) {
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
  fields = [],
  id = null
} = {}) {
  const classes = useStyles(),
        [ visible, setVisible ] = useState( true )

  function handleClose () {
    setVisible( false )

    if ('close' in actions) {
      if (typeof actions.close === 'function') {
        close()
      }
    }
  }

  function handleSubmit (e) {
    e.preventDefault()

    console.log( id, actions )
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
        <FormButton click={ handleSubmit } color='secondary' icon={ <Delete /> }>
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
    return fields.filter( ({ type }) => type !== undefined ).map( ({ name, label, type }) => {
      // TODO
    })

    /*
    <TextField className={classes.input}
      id='display_name'
      label='Username'
      defaultValue={fields.display_name}
      onChange={createChangeHandler('display_name')}
      variant='outlined'
      margin='normal'
    />

    <Selector label='Type' onChange={ createChangeHandler('type') }
      value={ fields.type }
      values={ types }
    />
    */
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
        [ dialog, setDialog ] = useState( false ),
        [ page, setPage ] = useState( 0 ),
        [ selected, setSelected ] = useState( null ),
        [ sort, setSort ] = useState({
          field: fields[0].name,
          order: 'asc'
        }),
        [{ count, rows }, dispatch ] = useStore(),
        rowsPerPage = 20

  function handleChange (e, value) {
    setPage( value )
  }

  function handleClose () {
    setSelected( null )
    setDialog( false )
  }

  function handleCreate () {
    setDialog( true )
  }

  function handleSelect (e, id) {
    setSelected( id )
  }

  function handleSort (e, field) {
    setSort({
      field,
      order: (sort.field === field && sort.order === 'asc') ? 'desc' : 'asc'
    })
  }

  function renderDialog () {
    if (dialog) {
      return (
        <FormDialog actions={ actions } close={ handleClose } fields={ fields } id={ selected } />
      )
    }
  }

  function renderHead () {
    return fields.filter(({ label }) => label !== undefined).map( ({ label, name }) => {
      const { field, order } = sort,
            clickHandler = CreateHandler( handleSort, name )

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
    return fields.filter( ({ label }) => label !== undefined ).map( ({ align, name }) => (
      <TableCell key={ name } align={ align ? align : 'left' }>
        { row[name] }
      </TableCell>
    ))
  }

  function renderRows () {
    return rows.map( (row) => {
      const { id } = row,
            selectHandler = CreateHandler( handleSelect, id )

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
  }, [ page, sort ])

  useEffect( () => {
    if (selected !== null) {
      setDialog( true )
    }
  }, [ selected ])

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

