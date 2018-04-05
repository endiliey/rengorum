import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';

// Redux dev tool extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      createLogger(),
      thunkMiddleware
    )
  )
);
export default store;
