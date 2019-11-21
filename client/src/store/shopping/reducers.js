import {
    ADD_SHOPPING_ITEM_FAIL,
    ADD_SHOPPING_ITEM_START,
    GET_SHOPPING_LIST_FAIL,
    GET_SHOPPING_LIST_START,
    GET_SHOPPING_LIST_SUCCESS,
  } from './types';
  import { LOGOUT } from '../auth/types';
  
  const initialState = {
    list: [],
    isLoading: false,
    errors: null,
  };
  
  export const shoppingReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case GET_SHOPPING_LIST_START:
        return { ...state, isLoading: true, errors: null };
      case GET_SHOPPING_LIST_SUCCESS:
        return { ...state, isLoading: false, list: payload, errors: null };
      case GET_SHOPPING_LIST_FAIL:
        return { ...state, isLoading: false, list: [], errors: payload };
      case ADD_SHOPPING_ITEM_START:
        return { ...state, isLoading: true, list: [], errors: payload };
      case ADD_SHOPPING_ITEM_FAIL:
        return { ...state, isLoading: false, errors: payload };
      case LOGOUT:
        return initialState;
      default:
        return state;
    }
  };