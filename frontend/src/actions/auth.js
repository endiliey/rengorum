import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from './types';
import { API_URL, LOGIN_URL, LOGOUT_URL, getHeader } from './api';

export const login = (username, password) => {
  return (dispatch) => {
    dispatch(loginRequest());

    axios.post(API_URL + LOGIN_URL, {
      username,
      password
    })
    .then(function (response) {
      dispatch(loginSuccess(response.data));
    })
    .catch(function (error) {
      var errorMessage = "Unknown Error";
      if (!error.response) {
        errorMessage = "Error: Network Error";
      } else if (error.response.data.non_field_errors){
        errorMessage = error.response.data.non_field_errors;
      } else if (error.response.data.username) {
        errorMessage = "Username: " + error.response.data.username;
      } else if (error.response.data.password) {
        errorMessage = "Password: "+ error.response.data.password;
      }
      dispatch(loginFailure(errorMessage));
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
    avatar: data.avatar,
    name: data.name
  };
}

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    error
  };
}

export const logout = () => dispatch => {
    dispatch(logoutAction());

    // api call to delete token server-side
    axios.post(API_URL + LOGOUT_URL, null, getHeader());
};

export const logoutAction = () => {
  return {
    type: LOGOUT
  };
}
