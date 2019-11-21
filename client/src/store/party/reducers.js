import {
    ADD_PARTY_FAIL,
    ADD_PARTY_START,
    ADD_PARTY_SUCCESS,
    DELETE_PARTY_FAIL,
    DELETE_PARTY_START,
    DELETE_PARTY_SUCCESS,
    GET_ALL_PARTIES_FAIL,
    GET_ALL_PARTIES_START,
    GET_ALL_PARTIES_SUCCESS,
    GET_SINGLE_PARTY_FAIL,
    GET_SINGLE_PARTY_START,
    GET_SINGLE_PARTY_SUCCESS,
    UPDATE_PARTY_FAIL,
    UPDATE_PARTY_START,
    UPDATE_PARTY_SUCCESS,
  } from './types';
  import { LOGOUT } from '../auth/types';
  
  const initialState = {
    parties: [],
    party: {},
    isLoading: false,
    errors: null,
  };
  
  export const eventsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case GET_ALL_PARTIES_START:
        return { ...state, isLoading: true, errors: null };
      case GET_ALL_PARTIES_SUCCESS:
        return { ...state, isLoading: false, parties: payload, errors: null };
      case GET_ALL_PARTIES_FAIL:
        return { ...state, isLoading: false, parties: [], errors: payload };
      case GET_SINGLE_PARTY_START:
        return { ...state, isLoading: true, errors: null };
      case GET_SINGLE_PARTY_SUCCESS:
        return { ...state, isLoading: false, errors: null, party: payload };
      case GET_SINGLE_PARTY_FAIL:
        return { ...state, isLoading: false, errors: payload, party: {} };
      case ADD_PARTY_START:
        return { ...state, isLoading: true, errors: null, party: {} };
      case ADD_PARTY_SUCCESS:
        return {
          ...state,
          isLoading: false,
          errors: null,
          party: {},
          parties: { ...state.parties, payload },
        };
      case ADD_PARTY_FAIL:
        return { ...state, isLoading: false, errors: payload, party: {} };
      case UPDATE_PARTY_START:
        return { ...state, isLoading: true, errors: null, party: {} };
      case UPDATE_PARTY_SUCCESS:
        return {
          ...state,
          isLoading: false,
          errors: null,
          party: {},
          parties: state.parties.map(
            party => party.id === payload.id ? payload : party),
        };
      case UPDATE_PARTY_FAIL:
        return { ...state, isLoading: false, errors: payload, party: {} };
      case DELETE_PARTY_START:
        return { ...state, isLoading: true, errors: null, party: {} };
      case DELETE_PARTY_SUCCESS:
        return {
          ...state,
          isLoading: false,
          errors: null,
          party: {},
          parties: state.parties.filter(party => party.id !== payload),
        };
      case DELETE_PARTY_FAIL:
        return { ...state, isLoading: false, errors: payload, party: {} };
      case LOGOUT:
        return initialState;
      default:
        return state;
    }
  };