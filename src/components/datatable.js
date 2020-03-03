import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import {
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
  cells = [],
  rows = []
} = {}) {
  const classes = useStyles(),
        [ order, setOrder ] = React.useState( 'asc' ),
        [ field, setField ] = React.useState( 'calories' ),
        [ page, setPage ] = React.useState( 0 ),
        rowsPerPage = 25

  function handleChange (e, value) {
    setPage( value )
  }

  function handleClick (e, value) {
    // TODO
  }

  function handleSort (e, cell) {
    setOrder( (field === cell && order === 'asc') ? 'desc' : 'asc' )
    setField( cell )
  }

  function renderHead (cells) {
    return cells.map( (cell) => {
      const { label, name } = cell,
            clickHandler = CreateHandler( handleSort, row.name )

      return (
        <TableCell align='left' key={ name } padding='default' sortDirection={ field === name ? order : false }>
          <TableSortLabel active={ field === name } direction={ field === name ? order : 'asc' } onClick={ clickHandler }>
            { label }
          </TableSortLabel>
        </TableCell>
      )
    })
  }

  // FIXME: hardcoded field's names
  // TODO: Manage align property
  function renderRows (rows) {
    return rows.map( (row, index) => {
      const id = `enhanced-table-checkbox-${index}`,
            clickHandler = CreateHandler( handleClick, row.name )

      return (
        <TableRow key={ row.name } hover tabIndex={ -1 } onClick={ clickHandler }>
          <TableCell component='th' id={ id } scope='row'>{ row.name }</TableCell>
          <TableCell align='left'>{ row.calories }</TableCell>
          <TableCell align='left'>{ row.fat }</TableCell>
          <TableCell align='left'>{ row.carbs }</TableCell>
          <TableCell align='left'>{ row.protein }</TableCell>
        </TableRow>
      )
    })
  }

  return (
    <div className={ classes.root }>
      <TableContainer>
        <Table className={ classes.table } size='small' stickyHeader>
          <TableHead>
            <TableRow>
              { renderHead( cells )}
            </TableRow>
          </TableHead>

          <TableBody>
            { renderRows( rows )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[ rowsPerPage ]}
        component='div'
        count={ rows.length }
        rowsPerPage={ rowsPerPage }
        page={ page }
        onChangePage={ handlePageChange }
      />
    </div>
  )
}
