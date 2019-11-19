import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { blue, pink, yellow } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import { ActionsContext } from '../../contexts/ActionsContext';

const useStyles = makeStyles(theme => ({
  table: {
    color: 'white',
    minWidth: 275,
    width: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderTop: '1px solid white',
    marginBottom: theme.spacing(1),
  },
}));

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: '#FEA47F',
    height: 50,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: '#fe885e',
    },
  },
}))(Button);

const ColorInput = withStyles(theme => ({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
    backgroundColor: yellow[100],
    color: theme.palette.getContrastText(pink[500]),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: yellow[200],
    },
  },
}))(TextField);


function AddItem(props) {
  console.log('AddItem Props', props);
  const classes = useStyles();
  const { shoppingActions: { addShoppingItem } } = useContext(ActionsContext);
  const [item, setItem] = useState({
    item: '', purchased: false, price: '', party_id: Number(props.match.params.id),
  });
  console.log(item);
  const saveItem = e => {
    e.preventDefault();
    props.addItemToList(item);
    setItem({ item: '', purchased: false, price: '', party_id: Number(props.match.params.id)})
  };

  function handleChange(event) {
    const updatedItem = { ...item, [event.target.name]: event.target.value };
    setItem(updatedItem);
  }

  return (

    <div className={classes.table}>
      <form onSubmit={saveItem}>
        <ColorInput
          color={'primary'}
          name='item'
          value={item.item}
          placeholder='Item'
          onChange={handleChange}
          margin='normal'
          variant='outlined'
        />
        <ColorInput
          name='price'
          placeholder='Price'
          onChange={handleChange}
          value={item.price}
          InputLabelProps={{
            shrink: true,
          }}
          margin='normal'
          variant='outlined'
        />

        <ColorButton variant='contained' color='primary' type='submit'>
          <AddIcon/>
        </ColorButton>
      </form>
    </div>

  );
}

export default withRouter(AddItem);