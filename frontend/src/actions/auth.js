import axios from 'axios';
import _ from 'lodash';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from './types';
import { URL, LOGIN } from './api';

// Calls the API to get a token and
// dispatches actions along the way
export const login = (username, password) => {
  return (dispatch) => {
    dispatch(loginRequest);

    // axios POST to our API_LOGIN url
    axios
    .post(URL + LOGIN, {
      username,
      password
    })
    .then(function (response) {
      dispatch(loginSuccess(response.data));
    })
    .catch(function (error) {
      // raise different exception if due to invalid credentials
      if (_.get(error, 'response.status') === 400) {
        dispatch(loginFailure("Invalid Credentials"));
      }
      else {
        dispatch(loginFailure(error));
      }
    });
  };
}

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  };
}

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    token: data.token,
    username: data.username,
    avatar: data.avatar
  };
}

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    error
  };
}
