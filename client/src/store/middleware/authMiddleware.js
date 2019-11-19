import {LOGIN_SUCCESS, LOGOUT} from '../auth/types';

export const authMiddleware = state => next => action => {
    if (action.type === LOGIN_SUCCESS) {
        // set token to Local Storage
    }

    if (action.type === LOGOUT) {
        // remove token from local storage
    }

    next(action);
} 