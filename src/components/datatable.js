import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import { useStore } from '../../lib/hooks'

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from '@material-ui/core'

const useStyles = makeStyles( (theme) => ({
  root: {
    width: '100%',
  },

  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
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
    get: null,
    select: null,
  },
  cells = [],
} = {}) {
  const [ { count, rows }, dispatch ] = useStore(),
        classes = useStyles(),
        [ sort, setSort ] = useState({ field: cells[0].name, order: 'asc' }),
        [ page, setPage ] = useState( 0 ),
        rowsPerPage = 25

  function handleChange (e, value) {
    setPage( value )
  }

  function HandleButtonClick () {
    const { create } = actions

    if (typeof create === 'function') {
      create()
    }
  }

  function handleRowClick (e, id) {
    const { select } = actions

    if (typeof select === 'function') {
      select( id )
    }
  }

  function handleSort (e, field) {
    setSort({
      field,
      order: (sort.field === field && sort.order === 'asc') ? 'desc' : 'asc'
    })
  }

  function renderHead (cells) {
    return cells.map( (cell) => {
      const { label, name } = cell,
            { field, order } = sort,
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
    return cells.map( (cell) => {
      const { align, name } = cell

      return (
        <TableCell key={ name } align={ align ? align : 'left' }>
          { row[name] }
        </TableCell>
      )
    })
  }

  function renderRows (rows) {
    return rows.map( (row) => {
      const { id } = row,
            clickHandler = CreateHandler( handleRowClick, id )

      return (
        <TableRow key={ id } hover tabIndex={ -1 } onClick={ clickHandler }>
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
          <Button variant='contained' onClick={ HandleButtonClick }>
            Create
          </Button>
        </Box>

        <Table className={ classes.table } size='small' stickyHeader>
          <TableHead>
            <TableRow>
              { renderHead( cells ) }
            </TableRow>
          </TableHead>

          <TableBody>
            { renderRows( rows ) }
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
    </div>
  )
}

DataTable.propTypes = {
  // TODO
}
