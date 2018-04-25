import axios from 'axios';
import store from '../store';
import {
  API_URL,
  LOGIN_URL,
  LOGOUT_URL,
  REGISTER_URL,
  USER_PROFILE_URL
} from './constants';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutAction,
  registerRequest,
  registerSuccess,
  registerFailure,
  fetchUserProfileRequest,
  fetchUserProfileSuccess,
  fetchUserProfileFailure
} from '../actions';

export const getConfig = () => {
  const isAuthenticated = store.getState().auth.isAuthenticated;
  if (isAuthenticated) {
    const token = store.getState().auth.token;
    const config = {
      headers: {'Authorization': 'Token ' + token}
    };
    return config;
  }
  return null;
}

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

export const logout = () => dispatch => {
    // api call to delete token server-side
    axios.post(API_URL + LOGOUT_URL, null, getConfig());

    dispatch(logoutAction());
};

export const register = (username, name, email, password) => {
  return (dispatch) => {
    dispatch(registerRequest());

    axios.post(API_URL + REGISTER_URL, {
      username,
      name,
      email,
      password
    })
    .then(function (response) {
      dispatch(registerSuccess());
      dispatch(login(username, password));
    })
    .catch(function (error) {
      let errorMessage = "Unknown Error";
      if (!error.response) {
        errorMessage = "Error: Network Error";
      } else if (error.response.data.non_field_errors){
        errorMessage = error.response.data.non_field_errors;
      } else if (error.response.data.username) {
        errorMessage = "Username: " + error.response.data.username;
      } else if (error.response.data.name) {
        errorMessage = "Name: " + error.response.data.name;
      } else if (error.response.data.email) {
        errorMessage = "Email: "+ error.response.data.email;
      } else if (error.response.data.password) {
        errorMessage = "Password: "+ error.response.data.password;
      }
      dispatch(registerFailure(errorMessage));
    });
  };
}

export const fetchUserProfile = username => dispatch => {
  dispatch(fetchUserProfileRequest());

  axios.get(API_URL + USER_PROFILE_URL + username)
  .then(function (response) {
    dispatch(fetchUserProfileSuccess(response.data));
  })
  .catch(function (error) {
    let errorMessage = "Unknown Error";
    if (!error.response) {
      errorMessage = "Error: Network Error";
    } else if (error.response.data.detail){
      errorMessage = "User: " + error.response.data.detail;
    }
    dispatch(fetchUserProfileFailure(errorMessage));
  });
};
