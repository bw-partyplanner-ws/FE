import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { authMiddleware } from "./middleware/authMiddleware";

import { authReducer as auth } from './auth/reducers';
import { eventsReducer as events } from "./events/reducers";

const rootReducer = combineReducers({auth, events});

const middleware = process.env.NODE_ENV === 'development' ? [thunk, logger, authMiddleware] : [thunk, authMiddleware];

const enhancers = process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(...middleware)) : applyMiddleware(...middleware);

export default createStore(rootReducer, enhancers);