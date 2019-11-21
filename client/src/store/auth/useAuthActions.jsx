import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { partyApi as axios } from '../../helpers/axiosConfig';
import {
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_START,
  REGISTER_SUCCESS,
  WELCOME_BACK,
} from './types';

export const useAuthActions = () => {
  const dispatch = useDispatch();
  const { getLocalStorage } = useLocalStorage('token');
  const login = useCallback((credentials) => {
    dispatch({ type: LOGIN_START });
    axios.post('/auth/login', credentials)
      .then((res) =>
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        }),
      )
      .catch(
        (err) => dispatch({ type: LOGIN_FAIL, payload: err.response.data }));
  }, [dispatch]);

  const register = useCallback((newUser) => {
    dispatch({ type: REGISTER_START });
    axios.post('/auth/register', newUser)
      .then((res) => {
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        dispatch({ type: LOGIN_START });
        axios.post('/auth/login', newUser)
          .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
          .catch(err => dispatch(
            { type: LOGIN_FAIL, payload: err.response.data }));
      })
      .catch(
        (err) => dispatch({ type: REGISTER_FAIL, payload: REGISTER_FAIL }));
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch({ type: LOGOUT });
  }, [dispatch]);

  const welcomeBack = useCallback(() => {
    const token = getLocalStorage();
    dispatch({ type: WELCOME_BACK, payload: token });
  }, [dispatch, getLocalStorage]);

  return { login, register, logout, welcomeBack };
};