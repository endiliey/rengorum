import { combineReducers } from 'redux';
import auth from './auth';
import modal from './modal';
import register from './register';
import userProfile from './userprofile';

const rootReducer = combineReducers({
  auth,
  modal,
  register,
  userProfile
});

export default rootReducer;
