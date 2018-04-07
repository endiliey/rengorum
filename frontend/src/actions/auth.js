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
      dispatch(loginFailure("Wrong username or password"));
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
