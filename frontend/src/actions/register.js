import axios from 'axios';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from './types';
import { API_URL, REGISTER_URL } from './api';
import { login } from './auth';

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
      console.log(error);
      var errorMessage = "Unknown Error";
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
    type: REGISTER_FAILURE,
    error
  };
}
