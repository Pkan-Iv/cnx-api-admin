import React, { useEffect, useState } from 'react'

import {
  Fab,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { Add, FilterList } from '@material-ui/icons'

import FormDialog from './form/dialog'
import { useStore } from 'lib/hooks'

const useStyles = makeStyles( (theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing( 2 ),
    right: theme.spacing( 2 )
  },

  root: {
    width: '100%',
  },

  table: {
    minWidth: '100%'
  }
}))

export default function DataTable({
  acls = {
    create: false,
    delete: false,
    read: false,
    update: false
  },
  actions = {
    create: null,
    delete: null,
    read: null,
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
        // TODO: Manage filter's values
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
    const { read } = actions

    if (typeof read === 'function') {
      const { field, order } = sort

      const props = {
        _p: page + 1,
        _n: rowsPerPage,
        _s: `${(order === 'desc' ? '-' : '' )}${field}`
      }

      if (filters !== null)
        props._w = filters

      dispatch( read( props ))
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
