import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export const useAuthActions = () => {
    const dispatch = useDispatch();

    const login = credentials => {};

    const register = newUser => {};

    const logout = () => {};

    const welcomeBack = () => {};

    return [login, register, logout, welcomeBack]
}