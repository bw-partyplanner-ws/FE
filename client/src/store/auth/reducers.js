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
  import jwtDecode from 'jwt-decode';
  
  const initialState = {
    user: {
      username: '',
      userID: null,
    },
    isAuth: false,
    isLoading: false,
    errors: null,
  };
  
  export const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case LOGIN_START:
        return { ...state, isLoading: true, isAuth: false, errors: null };
      case LOGIN_SUCCESS:
        const { token, ...user } = payload;
        return { ...state, isLoading: false, isAuth: true, user, errors: null };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoading: false,
          isAuth: false,
          user: { username: '', userID: null },
          errors: payload,
        };
      case REGISTER_START:
        return { ...state, isLoading: true, isAuth: false, errors: null };
      case REGISTER_SUCCESS:
        return { ...state, isLoading: false, isAuth: false, errors: null };
      case REGISTER_FAIL:
        return { ...state, isLoading: false, isAuth: false, errors: payload };
      case LOGOUT:
        return initialState;
      case WELCOME_BACK:
        const { subject, username } = jwtDecode(payload);
        return {
          ...state,
          isLoading: false,
          isAuth: true,
          user: { username, userID: subject },
          errors: null,
        };
      default:
        return state;
    }
  };