import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ActionsContext } from '../../contexts/ActionsContext';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1
  }
}));

const Navigation = () => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const {authActions: {logout}} = useContext(ActionsContext);
  const classes = useStyles();
  return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
                Party Planner
            </Typography>
            {!isAuth && <Button component={RouterLink} to="/register" color="inherit">Register</Button>}
            {!isAuth && <Button component={RouterLink} to="/" color="inherit">Login</Button>}
            {isAuth && <Button component={RouterLink} to='/dashboard' color='inherit'>Dashboard</Button>}
            {isAuth && <Button component={RouterLink} to='/dashboard/add-party' color="inherit">Add Party</Button>}
            {isAuth && <Button component={RouterLink} to='/' color='inherit' onClick={logout}>Logout</Button>}
          </Toolbar>
        </AppBar>
  </div>
  )
};

export default Navigation