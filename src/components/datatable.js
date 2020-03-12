import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { useStore } from '../../lib/hooks'

import {
  Box,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add'

import { useStore } from '../../lib/hooks'
import { CreateHandler, Filters } from '../utils'

const useStyles = makeStyles( (theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },

  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
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
        [{ count, rows }, dispatch ] = useStore(),
        [ page, setPage ] = useState( 0 ),
        [ sort, setSort ] = useState({
          field: fields[0].name,
          order: 'asc'
        }),
        rowsPerPage = 20

  function handleChange (e, value) {
    setPage( value )
  }

  function handleCreate () {
    // TODO
  }

  function handleSelect (e, id) {
    // TODO
  }

  function handleSort (e, field) {
    setSort({
      field,
      order: (sort.field === field && sort.order === 'asc') ? 'desc' : 'asc'
    })
  }

  function renderHead () {
    return fields.filter( Filters.not.undefined ).map( ({ label, name }) => {
      const { field, order } = sort,
            clickHandler = CreateHandler( handleSort, name )

      return (
        <TableCell align='left' key={ name } padding='default' sortDirection={ field === name ? order : false }>
          <TableSortLabel active={ field === name } direction={ field === name ? order : 'asc' } onClick={ clickHandler }>
            { label }
          </TableSortLabel>
        </TableCell>
      )
    })
  }

  function renderRow (row) {
    return fields.filter( Filters.not.undefined ).map( ({ align, name }) => (
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

  return (
    <div className={ classes.root }>
      <TableContainer>
        <Box component='div' m={ 1 }>

        </Box>

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

      <Fab className={ classes.fab } color="primary" onClick={ handleCreate }>
        <AddIcon />
      </Fab>
    </div>
  )
}

