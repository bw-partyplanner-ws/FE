import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { partyApiWithAuth as axios } from '../../helpers/axiosConfig';
import {
  ADD_TODO_ITEM_START,
  DELETE_TODO_ITEM_START,
  EDIT_TODO_ITEM_START,
  GET_TODO_ITEM_START,
  GET_TODO_LIST_START,
} from './types';

export const useTodoActions = () => {
  const dispatch = useDispatch();

  const fetchAllTodo = useCallback((partyId) => {
    dispatch({ type: GET_TODO_LIST_START });
    axios().get(`/parties/${partyId}/todo`).then(res => console.log(res.data)).catch(err => console.log(err.response));
  }, [dispatch]);

  const fetchTodoItem = useCallback(
    (partyId, todoId) => {
      dispatch({ type: GET_TODO_ITEM_START });
      axios()
        .get(`/parties/${partyId}/todo/${todoId}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    },
    [dispatch],
  );

  const addTodoItem = useCallback(
    (item) => {
      dispatch({ type: ADD_TODO_ITEM_START });
      axios()
        .post(`/parties/${item.party_id}/todo`, item)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    },
    [dispatch],
  );

  const editTodoItem = useCallback(
    (updatedItem) => {
      dispatch({ type: EDIT_TODO_ITEM_START });
      axios()
        .put(`/parties/${updatedItem.party_id}/todo/${updatedItem.id}`,
          updatedItem)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    },
    [dispatch],
  );

  const deleteTodoItem = useCallback(
    (partyId, todoId) => {
      dispatch({ type: DELETE_TODO_ITEM_START });
      axios()
        .delete(`/parties/${partyId}/todo/${todoId}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    },
    [dispatch],
  );

  return { fetchAllTodo, fetchTodoItem, addTodoItem, editTodoItem, deleteTodoItem };
};