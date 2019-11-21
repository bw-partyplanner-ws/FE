import React, { useState, useContext, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { ActionsContext } from '../contexts/ActionsContext';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'

const useStyles = makeStyles(theme => ({
  container: {
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    flexDirection: 'column'
  },
  formShow: {
    backgroundColor: '#B33771',
  },
  title: {
    paddingBottom: theme.spacing(2)
  },
}));

const CoolForm = styled.form`
  text-align: center;
  padding: 20px;
  border: 1px solid gray;
  border-radius: 4px;
  width: 480px;
  display: flex;
  flex-direction: column;
`;

const CoolButton = styled.button`
  color: #FEA47F;
  font-weight: bold;
  margin: 20px;
  padding: 5px 20px;
  border-radius: 6px;
`;

function Login(props) {
  const classes=useStyles();
  const isAuth = useSelector(state => state.auth.isAuth);
  const [user, setUser] = useState({username: '', password: ''});
  const [isRegister, setIsRegister] = useState(false);
  const {authActions: {login, register, welcomeBack, logout}} = useContext(
      ActionsContext);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const {exp} = jwt_decode(localStorage.getItem('token'));
      const currentDate = Date.now() / 1000;
      exp > currentDate ? welcomeBack() : logout();
    }
  }, []);

  useEffect(() => {
    isAuth && props.history.push('/dashboard');
  }, [isAuth]);

  useEffect(() => {
    if (props.location.pathname === '/') {
      setIsRegister(false);
    } else if (props.location.pathname === '/register') {
      setIsRegister(true);
    }
  }, [props.location.pathname]);

  const handleChange = event => {
    console.log(user, 'userbefore');
    setUser({...user, [event.target.name]: event.target.value});
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (isRegister) {
      register(user);
    } else {
      login(user);
    }
  };

  return (
      <div className={classes.container}>
        <Typography variant='h4' color='secondary' className={classes.title}>{`Welcome to Party Planner.  Please ${isRegister ? 'Register' : 'Login'} to continue`}</Typography>
        <CoolForm onSubmit={event => handleSubmit(event)} className={classes.formShow}>
          <TextField id='username' name='username' value={user.username}
                     onChange={handleChange} label='Username' margin='normal'
                     variant='filled'/>
          <TextField id='password' name='password' type='password'
                     value={user.password} onChange={handleChange}
                     label='Password' margin='normal' variant='filled'/>
          <Button color='secondary' type='submit'>{isRegister ? 'Register' : 'Login'}</Button>
          {!isRegister && <Typography>Not a Member?  Click <Link component={RouterLink} to='/register' color='secondary'>Here</Link> to Register</Typography>}
          {isRegister && <Typography>Already a Member?  Click <Link component={RouterLink} to='/' color='secondary'>Here</Link> to Login</Typography>}
        </CoolForm>
      </div>
  );
}

export default Login;