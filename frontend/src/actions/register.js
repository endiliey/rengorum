import axios from 'axios';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from './types';
import { API_URL, REGISTER_URL } from './api';

export const login = (username, email, password) => {
  return (dispatch) => {
    dispatch(registerRequest());

    axios.post(API_URL + REGISTER_URL, {
      username,
      email
      password
    })
    .then(function (response) {
      dispatch(registerSuccess());
    })
    .catch(function (error) {
      dispatch(registerFailure(error));
    });
  };
}

export const registerRequest = () => {
  return {
    type: REGISTER_REQUEST
  };
}

export const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS
  };
}

export const registerFailure = (error) => {
  return {
    type: REGISTER_FAILURE
    error
  };
}
