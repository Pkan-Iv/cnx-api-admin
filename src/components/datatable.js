import React, { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Tooltip
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import {
  Add,
  Cancel,
  Delete,
  Edit,
  FilterList,
  Save,
  Search
} from '@material-ui/icons'

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
    style: {
      float: type === 'submit' ? 'right' : 'left'
    },
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

export default function DataTable({
  actions = {
    create: null,
    delete: null,
    get: null,
    update: null
  },
  fields = [],
  height
} = {}) {
  if (height === undefined)
    return null

  const classes = useStyles(),
        [ dialog, setDialog ] = useState({
          selected: null,
          title: null,
          type: null
        }),
        [ filters, setFilters ] = useState({}),
        [ page, setPage ] = useState( 0 ),
        [ sort, setSort ] = useState({
          field: fields[0].name,
          order: 'asc'
        }),
        [{ count, rows }, dispatch ] = useStore(),
        rowsPerPage = 50

  function createHandler (handler, property) {
    return (event) => handler( event, property )
  }

  function handleChange (e, value) {
    setPage( value )
  }

  function handleClose () {
    setDialog({
      selected: null,
      title: null,
      type: null
    })

    loadData()
  }

  function handleCreate () {
    setDialog({
      selected: null,
      title: 'Create a new item',
      type: 'create'
    })
  }

  function handleFiltering (values) {
    loadData( Object.keys( values ).filter(
      (field) => values[field] !== undefined
    ).map(
      (field) => `(${field},eq,${values[field]})`
    ).join( '~and' ))
  }

  function handleSearch () {
    setDialog({
      selected: null,
      title: 'Search in items',
      type: 'search'
    })
  }

  function handleSelect (e, id) {
    setDialog({
      selected: id,
      title: 'Edit an item',
      type: 'update'
    })
  }

  function handleSort (e, field) {
    setSort({
      field,
      order: (sort.field === field && sort.order === 'asc') ? 'desc' : 'asc'
    })
  }

  function isDefined ({ type }) {
    return type !== undefined
  }

  function isFilter ({ filter }) {
    return filter !== false
  }

  function isVisible ({ visible }) {
    return visible !== false
  }

  function loadData (filters = null) {
    const { get } = actions

    if (typeof get === 'function') {
      const { field, order } = sort

      const props = {
        _p: page + 1,
        _n: rowsPerPage,
        _s: `${(order === 'desc' ? '-' : '' )}${field}`
      }

      if (filters !== null)
        props._w = filters

      dispatch( get( props ))
    }
  }

  function renderDialog () {
    const { selected, title, type } = dialog,
          filter = type === 'search' ? isFilter : isDefined

    if (type !== null) {
      return (
        <FormDialog actions={{ ...actions, close: handleClose, search: handleFiltering }}
          data={ rows.filter( ({ id }) => id === selected )[0] }
          fields={
            fields.filter( filter ).map( (field) => {
              const { bind } = field
              return bind ? { ...field, name: bind } : field
            })
          }
          id={ selected }
          title={ title }
          type={ type }
        />
      )
    }
  }

  function renderHead () {
    return fields.filter( isVisible ).map( ({ label, name }) => {
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
    return fields.filter( isVisible ).map( ({ align, name }) => (
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

  useEffect( loadData, [ page, sort ])

  return (
    <div className={ classes.root }>
      <Toolbar>
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list" onClick={ handleSearch }>
            <FilterList />
          </IconButton>
        </Tooltip>
      </Toolbar>

      <TableContainer style={{ height: height - 256 }}>
        <Table className={ classes.table } size='small' stickyHeader={ true }>
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
