import { combineReducers } from 'redux';
import auth from './auth';
import modal from './modal';

const rootReducer = combineReducers({
  auth,
  modal
});

export default rootReducer;
