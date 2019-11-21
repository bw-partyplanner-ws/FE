import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import { pink } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useSelector } from 'react-redux';
import { ActionsContext } from '../../contexts/ActionsContext';

const StyledCheckbox = withStyles({
  root: {
    color: pink[50],
    '&$checked': {
      color: pink[50],
    },
  },
  checked: {},
})(props => <Checkbox color='default' {...props} />);

const useStyles = makeStyles(theme => ({
  card: {
    color: 'white',
    minWidth: 275,
    width: 500,
    paddingLeft: theme.spacing(1),
    backgroundColor: '#B33771',
  },
  
  whiteStyle: {
    color: pink[50],
  },
}));

function DisplayList(props) {
  console.log(props);

  const shoppingList = useSelector(state => state.shopping.list);
  const todoList = useSelector(state => state.todos.list);
  const list = props.mode === 'shopping' ? shoppingList : todoList;
  const { shoppingActions: { fetchShoppingList }, todoActions: { fetchAllTodo } } = useContext(ActionsContext);
  const classes = useStyles();
  const listOfItems = list.filter(item => item.party_id.toString() === props.match.params.id);
  const [checked, setChecked] = useState([0]);
  console.log(listOfItems);
  useEffect(() => {
    if (props.mode === 'shopping') props.match.params &&
    props.match.params.id && fetchShoppingList(props.match.params.id);
  }, []);


  useEffect(() => {
    if (props.mode !== 'shopping') props.match.params && props.match.params.id && fetchAllTodo(props.match.params.id);
  }, []);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    console.log("currentIndex", currentIndex, "value ", value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
      <div>
        {props.mode === 'shopping' && <h1>Shopping List</h1>}
        {props.mode === 'todos' && <h1>Todo List</h1>}
        <Card className = {classes.card}>
          <List className = {classes.list}>
            {console.log('checked items ', checked)}
            {listOfItems.map(item => {
              return (
                  <ListItem key = {item.id} role={undefined} dense button
                            onClick = {() => handleToggle(item.item)}>
                    <ListItemIcon>
                      <FormControlLabel
                          control = {
                            <StyledCheckbox
                                edge="start"
                                checked={checked.indexOf(item.item) !== -1}
                                value={item.party_id}
                                disableRipple


                        inputProps={{ 'aria-labelledby': `${item.item} ${item.id}` }}
                      />
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  id = {`${item.item} ${item.id}`}
                  primary = {item.item}
                />
                <ListItemSecondaryAction>
                  <IconButton edge = 'end' aria-label='comments'>
                    <EditIcon className = {classes.whiteStyle}/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Card>
    </div>

  );

}

export default withRouter(DisplayList);