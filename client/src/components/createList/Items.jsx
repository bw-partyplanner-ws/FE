import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EmptyList from './EmptyList';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import Typography from '@material-ui/core/Typography';
import List from '../list/List';
import { useSelector } from 'react-redux';
import { ActionsContext } from '../../contexts/ActionsContext';

const useStyles = makeStyles(theme => ({
  table: {
    backgroundColor: '#B33771',
  },
  tableHead: {
    backgroundColor: '#FC427B',
    boxShadow: '0px 10px 6px 0px rgba(63, 36, 42, 0.3)',
    borderBottom: '6px solid #FC427B',
  },
  tableRow: {
    borderBottom: '1px solid white',
  },
  tableCell: {
    color: 'white',
  },
  tableBtn: {
    color: 'white',
    width: 50,
    margin: 0,
    padding: 0,
  },
}));

function Items(props) {
  const classes = useStyles();
  // const [items, setItems] = useState(props.items);

  const items = useSelector(state => state.shopping.list);
  const { shoppingActions: { deleteShoppingItem } } = useContext(ActionsContext);
  const deleteItem = item => deleteShoppingItem(item);

  return (

    <Table>
      {props.status === true && (<List/>)}

      {props.status === false && items.length === 0 && (<EmptyList/>)}

      {props.status === false && items.length > 0 && (
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.tableCell}><Typography
              variant='h6'
            >№</Typography></TableCell>
            <TableCell className={classes.tableCell}><Typography
              variant='h6'
            >Item</Typography></TableCell>
            <TableCell className={classes.tableCell}><Typography
              variant='h6'
            >Price</Typography></TableCell>
            <TableCell className={classes.tableCell}><Typography
              variant='h6'
            > </Typography></TableCell>
            <TableCell className={classes.tableCell}><Typography
              variant='h6'
            > </Typography></TableCell>
          </TableRow>
        </TableHead>
      )}
      {props.status === false && items.length > 0 && (
        items.map((row, item) => (
          <TableBody>
            <TableRow key={item} className={classes.tableRow}>
              <TableCell className={classes.tableCell} component='th' scope='row'>
                <Typography>{item + 1}</Typography>
              </TableCell>
              <TableCell className={classes.tableCell} component='th' scope='row'>
                {row.item}
              </TableCell>
              <TableCell className={classes.tableCell} component='th' scope='row'>
                {row.price}
              </TableCell>
              <TableCell className={classes.tableBtn} component='th' scope='row'>
                <EditButton item={row}/>
              </TableCell>
              <TableCell
                onClick={() => deleteItem(row)} className={classes.tableBtn} component='th'
                scope='row'
              >
                <DeleteButton/>
              </TableCell>
            </TableRow>
          </TableBody>
        ))
      )}

    </Table>
  );
}


export default Items;