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
import { URL, LOGIN, LOGOUT, getHeader } from './api';

// Calls the API to get a token and
// dispatches actions along the way
export const login = (username, password) => {
  return (dispatch) => {
    dispatch(loginRequest);

    axios.post(URL + LOGIN, {
      username,
      password
    })
    .then(function (response) {
      dispatch(loginSuccess(response.data));
    })
    .catch(function (error) {
      dispatch(loginFailure(error));
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
    dispatch(logoutRequest());

    axios.post(URL + LOGOUT, null, getHeader())
    .then(function (response) {
      dispatch(logoutSuccess(response));
    })
    .catch(function (error) {
      dispatch(logoutFailure(error));
    });
};

export const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST
  };
}

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  };
}

export const logoutFailure = (error) => {
  return {
    type: LOGOUT_FAILURE,
    error
  };
}
