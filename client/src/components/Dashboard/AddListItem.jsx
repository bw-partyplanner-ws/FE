import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ActionsContext } from '../../contexts/ActionsContext';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const AddListItem = (props) => {
  // Shop = True, Todo = False
  const [mode, setMode] = useState(false);
  const [values, setValues] = useState({});
  const { shoppingActions: { addShoppingItem }, todoActions: { addTodoItem } } = useContext(ActionsContext);
  useEffect(() => {
    if (props.mode === 'shopping') {
      setMode(true);
      setValues({ item: '', purchased: false, price: '', party_id: Number(props.match.params.id) });
    } else {
      setMode(false);
      setValues({ item: '', completed: false, party_id: Number(props.match.params.id) });
    }
  }, []);
  const handleChange = e => setValues({ ...values, [e.target.name]: e.target.value });
  const handleCheckChange = e => setValues({ ...values, [e.target.name]: e.target.checked });

  const handleSubmit = e => {
    e.preventDefault();
    console.log(values);
    mode ? addShoppingItem(values) : addTodoItem(values);
    props.history.push(`/dashboard/view-party/${values.party_id}`);
  };

  return (
    <Fragment>
      <h1>Hello World</h1>
      <p>Testing CRUD Operations</p>
      <form onSubmit={handleSubmit}>
        <TextField
          name='item' value={values.item} onChange={handleChange} variant='filled' margin='normal'
          label='Item'
        />
        {mode && <TextField
          name='price' value={values.price} onChange={handleChange} variant='filled' margin='normal'
          label='Price'
        />}
        <Button type='submit'>Submit</Button>
      </form>
    </Fragment>
  );
};

export default AddListItem;
