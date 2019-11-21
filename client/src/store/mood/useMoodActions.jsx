import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { partyApiWithAuth as axios } from '../../helpers/axiosConfig';
import { FETCH_MOOD_START } from './types';

export const useMoodActions = () => {
  const dispatch = useDispatch();
  const fetchMood = useCallback(() => {
    dispatch({ type: FETCH_MOOD_START });
    axios().get('/').then(res => console.log(res.data)).catch(err => console.log(err));
  }, [dispatch]);
};