import { LOGOUT } from '../auth/types';

const initialState = {
  list: [],
  isLoading: false,
  errors: null,
};

export const todosReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};