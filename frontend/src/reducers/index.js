import { combineReducers } from 'redux';
import auth from './auth';
import modal from './modal';
import register from './register';

const rootReducer = combineReducers({
  auth,
  modal,
  register
});

export default rootReducer;
