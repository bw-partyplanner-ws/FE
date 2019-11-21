import { createContext } from 'react';
import CreateList from '../components/createList/CreateList';

export const ActionsContext = createContext({});

export const ActionsProvider = ActionsContext.Provider;

export default CreateList;