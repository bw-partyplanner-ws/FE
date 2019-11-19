import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector(state => state.auth.isAuth);
  if (isAuth) {
    return <Route {...rest} render={props => <Component {...props} {...rest}/>}/>;
  } else {
    return <Redirect to='/'/>;
  }
};

export default PrivateRoute;