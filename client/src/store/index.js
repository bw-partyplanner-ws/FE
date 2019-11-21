import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { authMiddleware } from './middleware/authMiddleware';

import { authReducer as auth } from './auth/reducers';
import { eventsReducer as party } from './party/reducers';
import { shoppingReducer as shopping } from './shopping/reducers';
import { todosReducer as todos } from './todos/reducers';
import { moodReducer as mood } from './mood/reducers';

const rootReducer = combineReducers({ auth, party, shopping, todos, mood });

const middleware =
  process.env.NODE_ENV === 'development' ? [thunk, logger, authMiddleware] : [thunk, authMiddleware];

const enhancers =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(...middleware))
    : applyMiddleware(...middleware);

export default createStore(rootReducer, enhancers);