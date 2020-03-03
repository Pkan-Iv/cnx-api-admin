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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const cells = [
  { name: 'name', label: 'Name' },
  { name: 'calories', label: 'Calories' },
  { name: 'fat', label: 'Fat (g)' },
  { name: 'carbs', label: 'Carbs (g)' },
  { name: 'protein', label: 'Protein (g)' }
];

const rows = [
  createData( 'Cupcake', 305, 3.7, 67, 4.3 ),
  createData( 'Donut', 452, 25.0, 51, 4.9 ),
  createData( 'Eclair', 262, 16.0, 24, 6.0 ),
  createData( 'Frozen yoghurt', 159, 6.0, 24, 4.0 ),
  createData( 'Gingerbread', 356, 16.0, 49, 3.9 ),
  createData( 'Honeycomb', 408, 3.2, 87, 6.5 ),
  createData( 'Ice cream sandwich', 237, 9.0, 37, 4.3 ),
  createData( 'Jelly Bean', 375, 0.0, 94, 0.0 ),
  createData( 'KitKat', 518, 26.0, 65, 7.0 ),
  createData( 'Lollipop', 392, 0.2, 98, 0.0 ),
  createData( 'Marshmallow', 318, 0, 81, 2.0 ),
  createData( 'Nougat', 360, 19.0, 9, 37.0 ),
  createData( 'Oreo', 437, 18.0, 63, 4.0 )
];

const useStyles = makeStyles( (theme) => ({
  root: {
    width: '100%',
  },

  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },

  table: {
    minWidth: 750
  },

  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}))

function CreateHandler (handler, property) {
  return (event) => handler( event, property )
}

export default function EnhancedTable({
  /*
  cells: []
  rows: []
  */
}) {
  const classes = useStyles(),
        [ order, setOrder ] = React.useState( 'asc' ),
        [ field, setField ] = React.useState( 'calories' ),
        [ page, setPage ] = React.useState( 0 ),
        rowsPerPage = 25

  function handleRequestSort (e, property) {
    const isAsc = field === property && order === 'asc'

    setOrder( isAsc ? 'desc' : 'asc' )
    setField( property )
  }

  function handleClick (e, value) {
    // TODO
  }

  function handlePageChange (e, value) {
    setPage( value )
  }

  function renderHead ( cells ) {
    return cells.map( (cell) => {
      const { label, name } = cell
      return (
        <TableCell align='left' key={ name } padding='default' sortDirection={ field === name ? order : false }>
          <TableSortLabel active={ field === name } direction={ field === name ? order : 'asc' }
            onClick={ CreateHandler( handleRequestSort, name )}>
            { label }
          </TableSortLabel>
        </TableCell>
      )
    })
  }

  function renderRows (rows) {
    return rows.map( (row, index) => {
      const id = `enhanced-table-checkbox-${index}`

      return (
        <TableRow key={ row.name } hover tabIndex={ -1 }
          onClick={ CreateHandler( handleClick, row.name )}>
          <TableCell component="th" id={ id } scope="row">{ row.name }</TableCell>
          <TableCell align="right">{ row.calories }</TableCell>
          <TableCell align="right">{ row.fat }</TableCell>
          <TableCell align="right">{ row.carbs }</TableCell>
          <TableCell align="right">{ row.protein }</TableCell>
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
  );
}
